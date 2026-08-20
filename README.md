# Month-End Close Simulator

The Month-End Close Simulator is a small, interactive dashboard for practicing a simple accounting month-end close checklist. It presents five tasks for a fictional October 2026 close and shows progress as tasks move from not started to in progress or complete.

This project uses entirely fictional accounting data. The ledger, reserves, inventory, accruals, dates, names, and tasks are made up for learning purposes and do not represent a real company or financial records.

## Current Features

- A five-task month-end close checklist.
- A checkbox for marking each task complete.
- A status dropdown with `Not Started`, `In Progress`, and `Complete` options.
- An owner assigned to each task.
- Live updates for the completion percentage, completed task count, total task count, and overall close status.
- A responsive dashboard built with plain HTML, CSS, and JavaScript.

## What I'm Learning

I am building this as a GitHub and vibe-coding learning exercise. The project helps me practice:

- Structuring a small web project with HTML, CSS, and JavaScript.
- Selecting and updating page elements with JavaScript.
- Responding to user actions such as checkbox and dropdown changes.
- Calculating and displaying progress from application state.
- Using GitHub branches and Codespaces to develop and share a project.

## Run in GitHub Codespaces

1. Open this repository on GitHub.
2. Select **Code**, open the **Codespaces** tab, and choose **Create codespace on main**.
3. Wait for the Codespace to finish setting up.
4. In the terminal, start a simple local web server:

	```bash
	python3 -m http.server 8000
	```

5. Open the **Ports** tab, find port `8000`, and open the forwarded address in a browser.

The simulator should load from `index.html`. No database, build step, or external service is required.

## Planned Next Steps

The next features I plan to explore are:

- Saving task progress so it remains after a page refresh.
- Adding a reset button for starting a new practice close.
- Allowing users to add, edit, or remove checklist tasks.
- Adding filters or views for task status and owner.
- Improving accessibility and adding tests for the progress calculations.

## Project Files

- `index.html` contains the dashboard structure and fictional checklist data.
- `styles.css` contains the layout and visual styling.
- `script.js` contains the task interactions and progress calculations.
