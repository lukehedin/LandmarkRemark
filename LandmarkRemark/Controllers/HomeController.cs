using LandmarkRemark.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.Entity;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using System.Text;
using Newtonsoft.Json.Serialization;

namespace LandmarkRemark.Controllers
{
    public class HomeController : Controller
    {
		//LH: [Authorize] might be better used for this basic server-side verification.
		//LH: Another option could be to make a custom filter attribute that calls this method
		private static void VerifySession()
		{
			if (System.Web.HttpContext.Current.Session["user"] != null) return;
			throw new UnauthorizedAccessException("User not logged in");
		}

		//LH: Used to return camelCase JSON
		private static ContentResult ToJson(object obj)
		{
			return new ContentResult
			{
				ContentType = "application/json",
				Content = JsonConvert.SerializeObject(obj, new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() }),
				ContentEncoding = Encoding.UTF8
			};
		}

		private static ContentResult JsonError(string msg)
		{
			return ToJson(new { errorMsg = msg });
		}

		// GET: Home
		public ActionResult Index()
        {
            return View();
        }

		#region Authentication

		[HttpPost]
		public async Task<ActionResult> Register(string username, string password)
		{
			using (var db = new LandmarkRemarkDbContext())
			{
				//LH:  Don't let a user with a taken username get registered
				var user = await db.Users.SingleOrDefaultAsync(z => z.Username == username);

				//LH: More appropriate error messages could be applied here
				if (user != null) return JsonError("Username is taken");

				//LH: In a real scenario, right about here I'd be hashing the password provided, before storing it in the database!
				//LH: The users table would also have a more appropriate data type (eg. varchar(128)), if it was going to be storing hashed passwords.

				//Add the new user based on supplied data
				db.Users.Add(new User()
				{
					Username = username,
					Password = password,
					DateCreated = DateTime.Now
				});

				//Commit
				await db.SaveChangesAsync();
			}

			//Log in our newly created user immediately
			return await Login(username, password);
		}

		[HttpPost]
		public async Task<ActionResult> Login(string username, string password)
		{
			using (var db = new LandmarkRemarkDbContext())
			{
				//LH: Single or default, there definitely shouldn't be >1 user with the same username
				var dbUser = await db.Users.SingleOrDefaultAsync(z => z.Username == username);

				//LH: The password would need to be hashed to compare to its stored hash.
				if (dbUser == null || dbUser.Password != password) return JsonError("Incorrect username or password");

				var user = Models.Transport.User.FromDb(dbUser);

				//LH: Set the session variable to the user with matched password
				System.Web.HttpContext.Current.Session["user"] = user;

				return ToJson(user);
			}
		}

		[HttpPost]
		public void Logout()
		{
			VerifySession();

			//LH: Clear the user
			System.Web.HttpContext.Current.Session["user"] = null;
		}

		#endregion

		#region Remarks

		[HttpPost]
		public async Task<ActionResult> GetRemarks()
		{
			VerifySession();

			using (var db = new LandmarkRemarkDbContext())
			{
				var rems = await db.Remarks.ToArrayAsync();
				
				return ToJson(rems.Select(Models.Transport.Remark.FromDb).ToArray());
			}
		}

		[HttpPost]
		public async Task<ActionResult> CreateRemark(string remark, decimal lat, decimal lng)
		{
			VerifySession();

			using (var db = new LandmarkRemarkDbContext())
			{
				var userId = (System.Web.HttpContext.Current.Session["user"] as Models.Transport.User).UserId;
				var user = await db.Users.SingleOrDefaultAsync(z => z.UserId == userId);

				if (user == null)
					throw new NullReferenceException("User was not found");

				var newRemark = new Remark()
				{
					User = user,
					RemarkText = remark,
					Latitude = lat,
					Longitude = lng,
					DateCreated = DateTime.Now
				};

				var rems = db.Remarks.Add(newRemark);

				await db.SaveChangesAsync();

				return ToJson(Models.Transport.Remark.FromDb(newRemark));
			}
		}

		#endregion
	}
}