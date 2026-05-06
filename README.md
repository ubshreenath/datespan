# Datespan

A lightweight, client-side date calculator. Live at **[datespan.com](https://datespan.com)**.

## Features

- **Span between two dates** — calculates the exact time difference expressed in years, months, days, hours, minutes, and seconds in a human-readable format (e.g. "2 years, 3 months and 5 days").
- **Add or subtract from a date** — find the resulting date after adding or subtracting any number of days, weeks, months, or years.

## Tech stack

- Plain HTML/CSS/JS — no build step or package manager
- [Bootstrap 3](https://getbootstrap.com/) for layout and UI components
- [moment.js](https://momentjs.com/) for date arithmetic
- [Modernizr](https://modernizr.com/) with a jQuery UI datepicker fallback for browsers that lack native `<input type="date">` support
- jQuery loaded from CDN

## License

MIT — see [LICENSE](LICENSE).
