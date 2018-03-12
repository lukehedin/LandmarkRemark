using LandmarkRemark.Models;
using System;
using System.Data.Entity;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;

namespace LandmarkRemark.Controllers
{
	public class AuthenticationController : ApiController
    {
		[ResponseType(typeof(Models.Transport.User))]
		private async Task<Models.Transport.User> Register(string username, string password)
		{
			using (var db = new LandmarkRemarkDbContext())
			{
				//LH:  Don't let a user with a taken username get registered
				var user = await db.Users.SingleOrDefaultAsync(z => z.Username == username);

				//LH: More appropriate error messages could be applied here
				if (user != null) return null;

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
				db.SaveChanges();
			}

			//Log in our newly created user immediately
			return await Login(username, password);
		}
		
		[ResponseType(typeof(Models.Transport.User))]
		private async Task<Models.Transport.User> Login(string username, string password)
		{
			using (var db = new LandmarkRemarkDbContext())
			{
				//LH: Single or default, there definitely shouldn't be >1 user with the same username
				var user = await db.Users.SingleOrDefaultAsync(z => z.Username == username);

				//LH: More appropriate error messages could be applied here. Also the password would need to be hashed to compare to its stored hash.
				if (user == null || user.Password != password) return null;

				//LH: Set the session variable to the user with matched password
				System.Web.HttpContext.Current.Session["user"] = user;
				
				return Models.Transport.User.FromDb(user);
			}
		}
	}
}
