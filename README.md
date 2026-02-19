# sabby

Website for Sabby Gallery, made in [Eleventy](https://www.11ty.dev/).

## Requirements
- Install [Node.js](https://nodejs.org/en)
- **Code Editor** (VSCode, Sublime Text, etc.) for making changes.
- **Git** for pushing updates (if you have access to this repo)

Check whether you have Node installed correctly by running `node --version` in a terminal window.
Node includes `npm` (Node Package Manager), so you should also be able to run `npm -v` as well.

## Getting Started
1. Clone/download this repository (extract the `.zip` if downloading)
2. Open the `/sabby/` folder in your terminal window.
3. Run `npm install` to install dependencies.
4. Run `npm start` to serve a local version of the website, which you can open in your browser for testing. (e.g. `https://localhost:8080`)

## Making Changes

### Adding New Events

If you just want to make content updates (e.g. adding new events), then you only need to pay attention to the following subfolder:

```
sabby/src/events/
```

This folder contains `Markdown` files for each event, which look like this:

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

Each file contains *YAML* frontmatter containing all the necessary info for the event.

| name     | description                                              | 
| -------- | -------------------------------------------------------- |
| `title`  | Name of the event                                        |
| `date`   | Date of the event, formatted as `YYYY-MM-DD`             |
| `tags`   | Additional tag data (currently unused)                   |
| `poster` | Name of image file located in `src/images/posters/`      |
| `blurb`  | Short summary displayed on the `/events/` page           |

The body of the markdown is simply used as the full event description (shown on the event's page).

To make a new event, simply create a new file (following the naming convention `MM-event-name.md (MM = month)`, copypaste then edit the frontmatter from another event.

If you are already running a local server (by running `npm start`), the website should automatically update when you save. 
You can use this to preview and verify your changes before committing them to the repo.

> To add new posters, make sure to place them in the following subfolder `sabby/src/img/posters/`

### Making/editing new pages

If you need to update/edit pages, you can find most of them in `sabby/src/_pages`. These are `Nunjucks` files which should be fairly simple to edit, and have access to Eleventy's Data Cascade to conveniently pull data from other places.

Rather than writing an extensive tutorial here, please refer to [Eleventy's documentation](https://www.11ty.dev/docs/).

In any case, a few tips to help you around:
1. `src/_/` contains files that are passed through to the final output.
2. `src/_includes/_data/` contains JSON data that can be referenced using Nunjucks (e.g. `{{site.title}}` refers to "title" in `_data/site.json`)
3. `src/_includes/partials` contains reusable `Nunjucks` snippets that can be used around the site.

### Pushing changes to the repo

This repo is currently set up with `Github Actions` so that commits pushed to `origin/main` trigger an automatic build + deployment to the live site. Basically, the website will automatically update whenever you push your changes to the repo - easy!

> The `origin/live` branch is used by `Github Actions` to serve the site and should *never* be pushed to directly.

## Questions

If you are stuck or need help, please ask @jemztones!