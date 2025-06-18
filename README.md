# Simple.SwaggerThemeToggler

## Usage

The package comes with two extension methods that you use to activate the theme toggler:

``` (csharp)
app.UseSwaggerThemeToggler(); // this will load the actual resource files from the library
app.UseSwaggerUI(options =>
  {
    options.AddSwaggerThemeToggler(); // this will inject the js file to Swagger UI
  });
```
