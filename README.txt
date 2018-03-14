I began with a new empty ASP.NET project with the MVC base.

While I could have used one of ASP .NETs in built authentication templates, I wanted to avoid having too much generated code in the project.
For this reason, the authentication is all quite basic and is not secure.

I generated an ADO.NET Entity Data Model to map models between my code and database, which may be excessive for the simple data structure, but I am used to them saving my time!
You can see that I've also made Transport models (to go to the client) to map to the generated ones.

I also used the React.NET framework. 
This automatically compiles JSX to JS and caches it serverside, preventing the need for precompilation.

Notes:
- You can simulate a change in your location by clicking and holding anywhere on the map.
- jQuery & google maps are used on the front end