using System.Web;
using System.Web.Optimization;

namespace LandmarkRemark
{
	public class BundleConfig
	{
		public static void RegisterBundles(BundleCollection bundles)
		{
			bundles.Add(new ScriptBundle("~/bundles/components").Include(
						 "~/Scripts/Components/Button.jsx",
						 "~/Scripts/Components/AuthenticationForm.jsx",
						 "~/Scripts/Components/RemarkMap.jsx",
						 "~/Scripts/Components/AppBase.jsx"));

			bundles.Add(new ScriptBundle("~/bundles/styles").Include(
						 "~/Scripts/Styles/Button.css",
						 "~/Scripts/Styles/AuthenticationForm.css",
						 "~/Scripts/Styles/RemarkMap.css"));
		}
	}
}