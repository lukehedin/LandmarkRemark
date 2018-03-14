using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LandmarkRemark.Models.Transport
{
	public class Remark
	{
		public int RemarkId { get; set; }

		public int UserId { get; set; }

		public string Username { get; set; }

		public string RemarkText { get; set; }

		public decimal Latitude { get; set; }

		public decimal Longitude { get; set; }

		public string CreatedTimestamp { get; set; }

		public static Remark FromDb(Models.Remark rem)
		{
			return new Remark()
			{
				RemarkId = rem.RemarkId,
				UserId = rem.UserId,
				//'Username' join may not scale well. Could be enhanced by utilising a lookup of userId to username
				Username = rem.User.Username,
				RemarkText = rem.RemarkText,
				Latitude = rem.Latitude,
				Longitude = rem.Longitude,
				CreatedTimestamp = rem.DateCreated.ToString("dd/M/yyyy hh:mmtt")
			};
		}
	}
}