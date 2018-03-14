using React;

[assembly: WebActivatorEx.PreApplicationStartMethod(typeof(LandmarkRemark.ReactConfig), "Configure")]

namespace LandmarkRemark
{
	public static class ReactConfig
	{
		public static void Configure()
		{
			// If you want to use server-side rendering of React components, 
			// add all the necessary JavaScript files here. This includes 
			// your components as well as all of their dependencies.
			// See http://reactjs.net/ for more information. Example:
			//ReactSiteConfiguration.Configuration
			//	.AddScript("~/Scripts/First.jsx")
			//	.AddScript("~/Scripts/Second.jsx");

			ReactSiteConfiguration.Configuration
				.AddScript("~/Scripts/Components/Button.jsx")
				.AddScript("~/Scripts/Components/AuthenticationForm.jsx")
				.AddScript("~/Scripts/Components/RemarkAddForm.jsx")
				.AddScript("~/Scripts/Components/RemarkFilter.jsx")
				.AddScript("~/Scripts/Components/RemarkMap.jsx")
				.AddScript("~/Scripts/Components/AppBase.jsx");
		}
	}
}