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

		protected override void OnModelCreating(DbModelBuilder modelBuilder)
		{
			Database.SetInitializer<LandmarkRemarkDbContext>(null);

			//Required for proper decimal precision
			modelBuilder.Entity<Remark>().Property(x => x.Latitude).HasPrecision(9, 6);
			modelBuilder.Entity<Remark>().Property(x => x.Longitude).HasPrecision(9, 6);

			base.OnModelCreating(modelBuilder);
		}
	}
}