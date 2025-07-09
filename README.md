# Simple.SwaggerThemeToggler

This is a really simple theme toggler for use in .NET api:s using Swagger UI

![GitHub Repo stars](https://img.shields.io/github/stars/henkla/Simple.SwaggerThemeToggler)
![GitHub search hit counter](https://img.shields.io/github/search/henkla/Simple.SwaggerThemeToggler/goto)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/henkla/Simple.SwaggerThemeToggler/nuget-package.yml)
![GitHub Issues or Pull Requests](https://img.shields.io/github/issues/henkla/Simple.SwaggerThemeToggler)
[![NuGet version (Simple.ArgumentParser)](https://img.shields.io/nuget/v/Simple.SwaggerThemeToggler.svg?style=flat-square)](https://www.nuget.org/packages/Simple.SwaggerThemeToggler/)
![NuGet Downloads](https://img.shields.io/nuget/dt/Simple.SwaggerThemeToggler)


## Key points

* Super quick and easy 🚀
* Comes with [built in themes](#technical-information) 🛠️
* Supports custom themes 🔧
* dotnet 8+ 🏷️


## Table of Contents
1. [Getting started](#getting-started)
   1. [Installing](#installing)
   2. [Activating](#activating)
      1. [Using only built in themes](#using-only-built-in-themes)
      2. [Using custom themes](#using-custom-themes)
2. [Technical information](#technical-information)
3. [Known issues & limitations](#known-issues--limitations)


## Geting started

You will have to first install the package, and then activate it for use in your application. See the below steps:
### Installing 

Add a reference to the package `Simple.SwaggerThemeToggler` in your Web Api project. Once the package is added, you must activate it. The package comes with two extension methods that you use to activate the Theme Toggler. You can choose to either use the Theme Toggler with the build in themes only, or to also use your own theme definitions.

### Activating

#### Using only built in themes

```csharp
// this will load the actual resource files from the library
app.UseSwaggerThemeToggler();

app.UseSwaggerUI(options =>
  {
    // this will inject the js file to Swagger UI
    options.AddSwaggerThemeToggler(); 
  });
```


#### Using custom themes

You will need two things:

1. A `json`-file somewhere in `wwwroot` that lists all your custom themes:
```json
[
  {
    "name": "My Example Theme",
    "file": "/custom-themes/my-example.css"
  },
  {
    "name": "Another Example Theme",
    "file": "/custom-themes/another-example.css"
  }
]
```
2. The actual theme-files in `css`-format at the same location that you defined in the `json` file previously.

You might also have to tell the framework to use static files: `app.UseStaticFiles()`.

The registration is all the same, but you specify the path to your `json`-file from step 1 above:

```csharp
// since you are using static files in wwwroot, make sure the framework takes that into consideration
app.UseStaticFiles();

// this will load the actual resource files from the library
app.UseSwaggerThemeToggler();

app.UseSwaggerUI(options =>
  {
    // this will inject the js file to Swagger UI, and also add your own custom theme files
    options.AddSwaggerThemeToggler("/custom-themes/themes.json"); 
  });
```

## Technical information

Currently, these are the themes that comes with the package:
* Classic (standard Swagger UI)
* Dark
* Dracula
* Gruvbox Dark
* Monokai
* Muted
* Newspaper
* Nord Dark
* One Dark


## Known issues & limitations

There are some issues yet to be resolved:
* A good portion of the built in themes needs heavy rework 🔥

