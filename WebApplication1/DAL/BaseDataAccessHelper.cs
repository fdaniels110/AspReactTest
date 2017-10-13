using System;
using System.Collections.Generic;
using System.Linq;
using WebApplication1.Models;

namespace WebApplication1.DAL
{
    public class BaseDataAccessHelper
    {
        static List<CommentModel> list = new List<CommentModel>() {
                new CommentModel
                {
                    Id = 1,
                    Author = "Daniel Lo Nigro",
                    Text = "Hello ReactJS.Net World!"
                },
                new CommentModel
                {
                    Id = 2,
                    Author = "Pete Hunt",
                    Text = "This is one comment"
                },
                new CommentModel
                {
                    Id = 3,
                    Author = "Jordan Walke",
                    Text = "This is *another* comment"
                },
            };
        public static List<CommentModel> CommentsList() {
            return list;
        }

        public static void CommentAdd(CommentModel comment)
        {
            list.Add(comment);
        }
    }
}