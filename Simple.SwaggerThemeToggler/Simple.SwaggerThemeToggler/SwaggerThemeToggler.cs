using System.Reflection;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.FileProviders;
using Swashbuckle.AspNetCore.SwaggerUI;

namespace Simple.SwaggerThemeToggler;

public static class SwaggerThemeTogglerExtensions
{
    private const string EmbeddedFolder = "wwwroot";
    private const string RequestPath = "/swagger-theme-toggler";
    private const string ScriptName = "theme-toggler.js";

    /// <summary>
    /// Configures middleware to serve embedded static files (such as JavaScript and CSS)
    /// from this assembly via a virtual request path. This allows Swagger UI to access
    /// resources that are bundled into the assembly without relying on the file system.
    /// </summary>
    /// <param name="app">The <see cref="IApplicationBuilder"/> instance used to configure the middleware pipeline.</param>
    /// <returns>The same <see cref="IApplicationBuilder"/> instance for chaining.</returns>
    public static IApplicationBuilder UseSwaggerThemeToggler(this IApplicationBuilder app)
    {
        var assembly = typeof(SwaggerThemeTogglerExtensions).GetTypeInfo().Assembly;

        app.UseStaticFiles(new StaticFileOptions
        {
            FileProvider = new ManifestEmbeddedFileProvider(assembly, EmbeddedFolder + RequestPath),
            RequestPath = RequestPath
        });

        return app;
    }

    /// <summary>
    /// Injects the JavaScript theme toggler into the Swagger UI interface.
    /// This should be called when configuring Swagger UI options in <c>Program.cs</c>.
    /// </summary>
    /// <param name="options">The <see cref="SwaggerUIOptions"/> instance used to configure Swagger UI.</param>
    /// <returns>The same <see cref="SwaggerUIOptions"/> instance for chaining.</returns>
    public static SwaggerUIOptions AddSwaggerThemeToggler(this SwaggerUIOptions options)
    {
        options.InjectJavascript($"{RequestPath}/{ScriptName}");

        return options;
    }
}