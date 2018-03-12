using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LandmarkRemark.Models.Transport
{
	public class User
	{
		public int UserId { get; set; }
		public string Username { get; set; }

		public static User FromDb(Models.User usr)
		{
			return new User
			{
				UserId = usr.UserId,
				Username = usr.Username
			};
		}
	}
}