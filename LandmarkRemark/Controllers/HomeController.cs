using LandmarkRemark.Models;
using System;
using System.Linq;
using System.Threading.Tasks;
using System.Data.Entity;
using System.Web.Mvc;
using LandmarkRemark.Helpers;

namespace LandmarkRemark.Controllers
{
	/* This is the only controller. 
	 * Ideally a lot of the Authentication/Remark functionality would be separated from here.
	 */

    public class HomeController : Controller
    {
		//[Authorize] might be better used for this basic server-side verification.
		//Another option could be to make a custom filter attribute that calls this method
		private static void VerifySession()
		{
			if (System.Web.HttpContext.Current.Session["user"] != null) return;
			throw new UnauthorizedAccessException("User not logged in");
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
				// Don't let a user with a taken username get registered
				var user = await db.Users.SingleOrDefaultAsync(z => z.Username == username);

				//More appropriate error messages could be applied here
				if (user != null) return JsonHelper.JsonError("Username is taken");

				//In a real scenario, right about here I'd be hashing the password provided, before storing it in the database!
				//The users table would also have a more appropriate data type (eg. varchar(128)), if it was going to be storing hashed passwords.

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
				//Single or default, there definitely shouldn't be >1 user with the same username
				var dbUser = await db.Users.SingleOrDefaultAsync(z => z.Username == username);

				//The password would need to be hashed to compare to its stored hash.
				if (dbUser == null || dbUser.Password != password) return JsonHelper.JsonError("Incorrect username or password");

				var user = Models.Transport.User.FromDb(dbUser);

				//Set the session variable to the user with matched password
				System.Web.HttpContext.Current.Session["user"] = user;

				return JsonHelper.ToJson(user);
			}
		}

		[HttpPost]
		public void Logout()
		{
			VerifySession();

			//Clear the user
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
				
				//Simply return all remarks from the DB
				return JsonHelper.ToJson(rems.Select(Models.Transport.Remark.FromDb).ToArray());
			}
		}

		[HttpPost]
		public async Task<ActionResult> CreateRemark(string remark, decimal lat, decimal lng)
		{
			VerifySession();

			using (var db = new LandmarkRemarkDbContext())
			{
				//Find the user based off the stored user session data
				var userId = (System.Web.HttpContext.Current.Session["user"] as Models.Transport.User).UserId;
				var user = await db.Users.SingleOrDefaultAsync(z => z.UserId == userId);

				if (user == null)
					throw new NullReferenceException("User was not found");

				//Create a new remark made by the user. I specifically use the 'User' here instead of 'UserId'
				//as the mapping method below, FromDb, when the data is returned uses the User.Username
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

				return JsonHelper.ToJson(Models.Transport.Remark.FromDb(newRemark));
			}
		}

		#endregion
	}
}