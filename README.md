# SAT-Theme-Student-Dashboard-protyped-tested-in-gemini-canvas-v2
# SAT Performance Hub - Student Dashboard

This is a static HTML, CSS, and JavaScript prototype for a student-facing SAT performance dashboard. It is designed to be hosted on GitHub Pages.

## Files

* `index.html`: The main HTML structure for the dashboard.
* `style.css`: Contains all custom CSS rules and theming.
* `script.js`: Handles dynamic content population (currently with dummy data), chart rendering, and tab interactivity.
* `data/` (Directory): Intended for future CSV data files (`DashboardFeed_AggregatedScores.csv`, `DashboardFeed_QuestionDetails.csv`). Currently, the dashboard uses inline dummy data in `script.js`.
* `assets/` (Directory): Suggested for storing images like the site logo.

## Setup and Viewing

1.  Clone or download this repository.
2.  Open `index.html` in a web browser to view the dashboard.

## Customization

### Logo
To add your logo:
1. Place your logo image file (e.g., `logo.png`) into an `assets` directory (create it if it doesn't exist).
2. In `index.html`, find the `<img>` tag with `alt="The SAT Hub Logo"`.
3. Change the `src` attribute from `YOUR_HOSTED_LOGO_URL_HERE` to the path of your logo (e.g., `assets/logo.png`). If you host your logo elsewhere, use the full URL.

### Data Source
Currently, the dashboard uses dummy data defined within `script.js`. To use dynamic data from CSV files:
1.  Ensure your data processing pipeline (e.g., Google Apps Script) generates two CSV files:
    * `DashboardFeed_AggregatedScores.csv`
    * `DashboardFeed_QuestionDetails.csv`
2.  Place these CSV files in the `data/` directory (or any other accessible web location).
3.  In `script.js`:
    * Update the `AGGREGATED_SCORES_CSV_URL` and `QUESTION_DETAILS_CSV_URL` constants with the correct paths to your CSV files.
    * Uncomment and implement the PapaParse fetching logic within the `loadAndDisplayData()` function.
    * Modify the `processAndFilterDataForStudent()` function (currently a conceptual placeholder) to correctly parse your CSV data and structure it for the dashboard's display functions.

## Libraries Used
* Tailwind CSS (via CDN)
* Chart.js (via CDN)
* PapaParse (via CDN - for future CSV parsing)
