# Simple.SwaggerThemeToggler
This is a really simple theme toggler for use in .NET api:s using Swagger UI

![GitHub Repo stars](https://img.shields.io/github/stars/henkla/Simple.SwaggerThemeToggler)
![GitHub search hit counter](https://img.shields.io/github/search/henkla/Simple.SwaggerThemeToggler/goto)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/henkla/Simple.SwaggerThemeToggler/nuget-package.yml)
![GitHub Issues or Pull Requests](https://img.shields.io/github/issues/henkla/Simple.SwaggerThemeToggler)
[![NuGet version (Simple.ArgumentParser)](https://img.shields.io/nuget/v/Simple.SwaggerThemeToggler.svg?style=flat-square)](https://www.nuget.org/packages/Simple.SwaggerThemeToggler/)
![NuGet Downloads](https://img.shields.io/nuget/dt/Simple.SwaggerThemeToggler)


## Key points
* Super quick and easy
* Comes with built in themes
* Suppoert for custom themes coming soon!


## Table of Contents
1. [Get started](#get-started)
2. [Technical information](#technical-information)
3. [Known issues & limitations](#known-issues--limitations)


## Get started

Run `dotnet add package Simple.SwaggerThemeToggler` to add the nuget package to the Web Api project. Once the package is added, you must activate it. The package comes with two extension methods that you use to activate the theme toggler:

```csharp

// this will load the actual resource files from the library
app.UseSwaggerThemeToggler();

app.UseSwaggerUI(options =>
  {
    // this will inject the js file to Swagger UI
    options.AddSwaggerThemeToggler(); 
  });
```

## Technical information

Currently, these are the themes that comes with the package:
* Classic (standard Swagger UI)
* Dark
* Dracula
* Gruvbox
* Monokai
* Muted
* Newspaper
* Nord Dark


## Known issues & limitations

There are some issues yet to be resolved:
* Support for custom themes not yet implemented
* A good portion of the built in themes needs heavy rework

