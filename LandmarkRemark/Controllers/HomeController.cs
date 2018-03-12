using LandmarkRemark.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LandmarkRemark.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
			using(var db = new LandmarkRemarkDbContext())
			{
				var rems = db.Remarks.SingleOrDefault();
			}

            return View();
        }
    }
}