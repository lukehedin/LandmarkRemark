using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace LandmarkRemark.Models
{
	public class Remark
	{
		[Key]
		public int RemarkId { get; set; }

		public int UserId { get; set; }

		public string RemarkText { get; set; }

		public double Latitude { get; set; }

		public double Longitude { get; set; }

		public DateTime DateCreated { get; set; }
	}
}