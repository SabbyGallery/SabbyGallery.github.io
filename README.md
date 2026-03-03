# ![Sabby Co-op](./src/img/SABBY_Colour_DarkBackground_Trans.svg)

## Making content changes

You can edit files directly on GitHub in any of your repositories using the file editor. Follow this guide on [Editing files with the GitHub file editor](https://docs.github.com/en/repositories/working-with-files/managing-files/editing-files).

### Adding new events

If you just want to make content updates (e.g. adding new events), then you only need to pay attention to the following subfolder:

```
sabby/src/events/
```

This folder contains markdown files for each event.

To learn more about markdown check out the [Markdown Guide](https://www.markdownguide.org/):
- [The cheat sheet](https://www.markdownguide.org/cheat-sheet/)
- [The basic syntax](https://www.markdownguide.org/basic-syntax/)
- [The extended syntax](https://www.markdownguide.org/extended-syntax/)

The markdown files look like this:

`05-zine-club.md`
```md
---
title: Zine Club
date: 2024-05-18
tags: [zine-club]
poster: "ZineClub-May2024.jpg"
blurb: "Zine Club is back in May!"
---

Come hang out, make a zine or two.
Supplies are provided but feel free to BYO if you have extra stuff you want to use (and share!).

From 2 p.m. to 6 p.m.
```

Each file contains *YAML* [frontmatter](https://www.11ty.dev/docs/data-frontmatter/) containing all the necessary info for the event.

| name     | description                                              | 
| -------- | -------------------------------------------------------- |
| `title`  | Name of the event                                        |
| `date`   | Date of the event, formatted as `YYYY-MM-DD`             |
| `tags`   | Additional tag data (currently unused)                   |
| `poster` | Name of image file located in `src/images/posters/`      |
| `blurb`  | Short summary displayed on the `/events/` page           |

The body of the markdown is simply used as the full event description (shown on the event's page).

To make a new event, simply create a new file (following the naming convention `MM-event-name.md` (MM = month), copypaste then edit the frontmatter from another event.

To make a file not appear in the build, add the field `draft: true` to the frontmatter.

> [!NOTE]
> If you are already running a local server (by running `npm start`), the website should automatically update when you save.
> You can use this to preview and verify your changes before committing them to the repo.

To add new posters, make sure to place them in the following subfolder `sabby/src/img/posters/`

### Creating/editing pages

If you need to update/edit pages, you can find most of them in `sabby/src/_pages`. These are `Nunjucks` files which should be fairly simple to edit, and have access to Eleventy's Data Cascade to conveniently pull data from other places.

Rather than writing an extensive tutorial here, please refer to [Eleventy's documentation](https://www.11ty.dev/docs/).

In any case, a few tips to help you around:
1. `src/_/` contains files that are passed through to the final output.
2. `src/_includes/_data/` contains JSON data that can be referenced using Nunjucks (e.g. `{{site.title}}` refers to "title" in `_data/site.json`)
3. `src/_includes/partials` contains reusable `Nunjucks` snippets that can be used around the site.

### Pushing changes to the repo

This repo is currently set up with `Github Actions` so that commits pushed to `origin/main` trigger an automatic build + deployment to the live site. Basically, the website will automatically update whenever you push your changes to the repo - easy!

> [!CAUTION]
> The `origin/live` branch is used by `Github Actions` to serve the site and should *never* be pushed to directly.

## Running the dev server on your local computer

This isn't a requirement to make content updates as mentioned above, you can make content changes in the editor on the GitHub website. This allows you to preview changes to the site on your local computer without having to push them to the live site. **This requires some technical ability**.

If you need help, [reach out to the web team](#questions).

### Requirements

- [**A code editor**](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Code_editors) for editing files.
- [**A terminal/command line**](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Command_line) for running commands.
- [**Node.js (and NPM)**](https://nodejs.org/) for installing dependencies and running the dev server.
- [**Git**](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Version_control) for [committing and pushing updates](https://docs.github.com/en/repositories/working-with-files/managing-files) (if you have access to edit the [GitHub repo](https://github.com/SabbyGallery/SabbyGallery.github.io/)).
- [**Learn the basics of HTML and CSS**](](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core)), if you want to go a bit further, check out each of these guides for [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) and [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) respectively.
- [**Check out the Eleventy (11ty) documentation**](https://www.11ty.dev/) to learn the basics of how the Sabby website works.

### Getting Started

1. Clone the repository using Git:
	- *Make sure in your command line you're in the folder you want the website's folder placed inside.*
	- Run `git clone https://github.com/SabbyGallery/SabbyGallery.github.io.git`.
2. Move into the `/SabbyGallery.github.io/` folder in your command line.
3. Run `npm install` to install all of the website's dependencies.
4. Finally run `npm start` to start up the local development server. This is a local version of the website, which you can open in your browser for testing at <http://localhost:8080>. Changes made locally will not be reflected on the live site until you commit and push them to the `origin/main` branch on the GitHub repo.

## Questions

If you are stuck or need help, please ask @heygleeson or @jemztones!
