************************
* DOCUMENTED HOURS     *
************************

Monday 12/03 - ~2 HOURS - I spent a bit of time on Monday getting my head around requirements and deciding on a project structure & UI.
Tuesday 13/03 - ~8 HOURS - The majority of work occurred on this day. Having the project structure settled, I was confident to jump in.
Wednesday 14/03 - ~2 HOURS - Wrapped up, a few style tweaks, testing the ZIP file locally.

************************
* NOTES                *
************************

- You can simulate a change in your location by clicking and holding anywhere on the map.
- Some example data has been supplied on the app

************************
* INFORMATION          *
************************

I began with a new empty ASP.NET project with the MVC base.

While I could have used one of ASP .NETs in built authentication templates, I wanted to avoid having too much generated code in the project. For this reason, the authentication is all quite basic and is not secure.

I generated an ADO.NET Entity Data Model to map models between my code and database, which may be excessive for the simple data structure, but I am used to them saving my time!
You can see that I've also made Transport models (to go to the client) that map to the ADO generated ones.

I used the React.NET framework for the client side. This automatically compiles JSX to JS and caches it serverside, preventing the need for precompilation.

I built the UI in a way that would maximise screen real estate on small mobile and large desktop devices, and am quite happy with its flexibility. For this reason, I didn't feel the need to utilise any CSS media queries to target particular devices.