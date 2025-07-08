#nullable enable
using System;
using System.Reflection;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.FileProviders;
using Swashbuckle.AspNetCore.SwaggerUI;

namespace Simple.SwaggerThemeToggler;

public static class SwaggerThemeTogglerExtensions
{
    private const string EmbeddedFolder = "wwwroot";
    private const string DefaultRequestPath = "/swagger-theme-toggler";
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
            FileProvider = new ManifestEmbeddedFileProvider(assembly, EmbeddedFolder + DefaultRequestPath),
            RequestPath = DefaultRequestPath
        });

        return app;
    }


    /// <summary>
    /// Adds the Swagger Theme Toggler JavaScript to the Swagger UI and optionally sets a custom
    /// URL path for loading user-defined themes JSON. This enables dynamic theme switching
    /// functionality in the Swagger UI interface.
    /// </summary>
    /// <param name="options">The <see cref="SwaggerUIOptions"/> instance to configure.</param>
    /// <param name="customThemesJsonUrl">
    /// An optional URL path to a custom <c>themes.json</c> file. If provided, this path will be
    /// assigned to <c>window.SwaggerThemeTogglerCustomPath</c> in the injected script to override
    /// the default themes JSON location.
    /// </param>
    /// <returns>The same <see cref="SwaggerUIOptions"/> instance to allow method chaining.</returns>
    public static SwaggerUIOptions AddSwaggerThemeToggler(this SwaggerUIOptions options, string? customThemesJsonUrl = null)
    {
        if (!string.IsNullOrEmpty(customThemesJsonUrl))
        {
            options.HeadContent += $"<script>window.SwaggerThemeTogglerCustomPath = '{customThemesJsonUrl}';</script>";
        }

        options.InjectJavascript("/swagger-theme-toggler/theme-toggler.js");

        return options;
    }
}