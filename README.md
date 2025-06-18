# Simple.SwaggerThemeToggler
This is a really simple theme toggler for use in .NET api:s using Swagger UI

![GitHub Repo stars](https://img.shields.io/github/stars/henkla/Simple.SwaggerThemeToggler)
![GitHub search hit counter](https://img.shields.io/github/search/henkla/Simple.SwaggerThemeToggler/goto)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/henkla/Simple.SwaggerThemeToggler/nuget-publish.yml)
![GitHub Issues or Pull Requests](https://img.shields.io/github/issues/henkla/Simple.SwaggerThemeToggler)
[![NuGet version (Simple.ArgumentParser)](https://img.shields.io/nuget/v/Simple.SwaggerThemeToggler.svg?style=flat-square)](https://www.nuget.org/packages/Simple.SwaggerThemeToggler/)
![NuGet Downloads](https://img.shields.io/nuget/dt/Simple.SwaggerThemeToggler)

## Usage

The package comes with two extension methods that you use to activate the theme toggler:

```csharp
app.UseSwaggerThemeToggler(); // this will load the actual resource files from the library
app.UseSwaggerUI(options =>
  {
    options.AddSwaggerThemeToggler(); // this will inject the js file to Swagger UI
  });
```
