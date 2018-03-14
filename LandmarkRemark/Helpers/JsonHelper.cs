using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace LandmarkRemark.Helpers
{
	public static class JsonHelper
	{
		//Used to return camelCase JSON
		public static ContentResult ToJson(object obj)
		{
			return new ContentResult
			{
				ContentType = "application/json",
				Content = JsonConvert.SerializeObject(obj, new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() }),
				ContentEncoding = Encoding.UTF8
			};
		}

		public static ContentResult JsonError(string msg)
		{
			return ToJson(new { errorMsg = msg });
		}
	}
}