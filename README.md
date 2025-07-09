# Simple.SwaggerThemeToggler

[![GitHub Repo stars](https://img.shields.io/github/stars/henkla/Simple.SwaggerThemeToggler)](https://github.com/henkla/Simple.SwaggerThemeToggler/stargazers)
[![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/henkla/Simple.SwaggerThemeToggler/nuget-package.yml)](https://github.com/henkla/Simple.SwaggerThemeToggler/actions)
[![NuGet version](https://img.shields.io/nuget/v/Simple.SwaggerThemeToggler.svg?style=flat-square)](https://www.nuget.org/packages/Simple.SwaggerThemeToggler/)
[![NuGet Downloads](https://img.shields.io/nuget/dt/Simple.SwaggerThemeToggler)](https://www.nuget.org/packages/Simple.SwaggerThemeToggler/)
[![GitHub Issues](https://img.shields.io/github/issues/henkla/Simple.SwaggerThemeToggler)](https://github.com/henkla/Simple.SwaggerThemeToggler/issues)

---

## 🚀 Overview

**Simple.SwaggerThemeToggler** is a plug-and-play theme switcher for Swagger UI in .NET applications.  
It adds a convenient dropdown menu so users can easily switch between multiple UI themes – including your own custom styles!

Supports both built-in themes and externally defined ones via JSON.  
No complicated setup – just a few lines of code and you're done.

---

## 🔑 Key Features

- ⚡ Super quick and easy to integrate
- 🛠️ Comes with built-in themes
- 🎨 Supports custom themes via JSON
- 🧩 .NET 8+ compatible

---

## 📚 Table of Contents

1. [Getting Started](#getting-started)
   - [Installing](#installing)
   - [Activating](#activating)
     - [Using Built-in Themes](#using-built-in-themes)
     - [Using Custom Themes](#using-custom-themes)
2. [What it looks like](#what-it-looks-like)
3. [Technical Information](#technical-information)
4. [Known Issues & Limitations](#known-issues--limitations)
5. [Contributing](#contributing)

---

## 🚦 Getting Started

To use Simple.SwaggerThemeToggler, install the NuGet package and activate it in your `Program.cs`.

### 📦 Installing

Add a reference to the package:

```
dotnet add package Simple.SwaggerThemeToggler
```

---

### 🧪 Activating

#### 💡 Using Built-in Themes

```csharp
app.UseSwaggerThemeToggler();

app.UseSwaggerUI(options =>
{
    options.AddSwaggerThemeToggler();
});
```

---

#### 🎨 Using Custom Themes

You need:

1. A JSON file (e.g. in `wwwroot/custom-themes/themes.json`) that describes your custom themes:
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

2. The actual CSS files in the location you referenced in the JSON above.

Make sure you enable static file serving:

```csharp
app.UseStaticFiles();

app.UseSwaggerThemeToggler();

app.UseSwaggerUI(options =>
{
    options.AddSwaggerThemeToggler("/custom-themes/themes.json");
});
```

---

## 🖼️ What it looks like

Once activated, a dropdown will appear in the top-right corner of Swagger UI, allowing users to choose their preferred theme:

![Screenshot](https://raw.githubusercontent.com/henkla/Simple.SwaggerThemeToggler/main/screenshot-1.png)

---

## 🔬 Technical Information

Built-in themes currently included:

- Classic (default Swagger UI)
- Dark
- Dracula
- Gruvbox Dark
- Monokai
- Muted
- Newspaper
- Nord Dark
- One Dark

---

## 🐞 Known Issues & Limitations

- Some built-in themes need rework for better consistency 🔥

---

## 🤝 Contributing

Found a bug or want to suggest a new feature?  
Feel free to [open an issue](https://github.com/henkla/Simple.SwaggerThemeToggler/issues) or submit a [pull request](https://github.com/henkla/Simple.SwaggerThemeToggler/pulls)!

---

## 📄 License

This project is licensed under the MIT License.
