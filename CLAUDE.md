# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static HTML/JS date calculator app hosted at [datespan.com](https://datespan.com). No build step, no package manager. Open `index.htm` directly in a browser to run it locally.

## Running tests

The only automated tests cover `humanSpan.js` and run directly with Node.js — no test framework needed:

```
node scripts/humanSpan.test.js
```

Exit code is non-zero on any failure.

## Architecture

The app has two tabs, both implemented in `scripts/addDatePicker.js`:

- **Span between 2 dates** — calls `humanSpan(dt1, dt2)` from `scripts/humanSpan.js` to produce a friendly string, then also shows raw seconds/minutes/hours/days/weeks/months/years.
- **Add/subtract from a date** — uses moment.js `add`/`subtract` directly.

**`scripts/humanSpan.js`** is a UMD module wrapping moment.js. It cascades through years → months → days → hours → minutes → seconds, consuming each unit before computing the next (so the remainders are exact). This is the only file with tests.

**`scripts/addDatePicker.js`** uses Modernizr to detect native `<input type="date">` support; browsers that lack it get a jQuery UI datepicker fallback loaded dynamically.

jQuery and Bootstrap are loaded from CDN in `index.htm`. `scripts/application.js` is Bootstrap's own docs sample — it is **not used** by the app.

## Deployment

Pushing to the `master` branch triggers cPanel Git deployment (`.cpanel.yml`) which copies the relevant files to `~/public_html/datespan.com`. Only the files listed in `.cpanel.yml` are deployed — vendor/dev scripts in `scripts/` that aren't listed there stay local only.
