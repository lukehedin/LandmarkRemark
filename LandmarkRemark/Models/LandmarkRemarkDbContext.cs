using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace LandmarkRemark.Models
{
	public class LandmarkRemarkDbContext : DbContext
	{
		public LandmarkRemarkDbContext() : base("LandmarkRemarkDbContext") { }

		public DbSet<User> Users { get; set; }

		public DbSet<Remark> Remarks { get; set; }
	}
}