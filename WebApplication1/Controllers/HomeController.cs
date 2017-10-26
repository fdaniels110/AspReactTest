using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            return View(DAL.BaseDataAccessHelper.CommentsList());
        }

        [OutputCache(Location = OutputCacheLocation.None)]
        [HttpGet]
        public ActionResult Comments()
        {
            return Json(DAL.BaseDataAccessHelper.CommentsList(), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult AddComment(CommentModel comment)
        {
            comment.Id = DAL.BaseDataAccessHelper.CommentsList().Count + 1;
            DAL.BaseDataAccessHelper.CommentAdd(comment);
            return Content("Success :)");
        }
    }
}