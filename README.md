# Automated Outreach Pipeline

## Overview

Automated Outreach Pipeline is a Node.js-based command-line application that automates lead generation and email outreach.

The application:

1. Accepts a company domain as input.
2. Finds similar companies using Ocean.io.
3. Finds decision-makers and contact details using Prospeo.
4. Stores leads in JSON format.
5. Sends personalized outreach emails using Brevo.
6. Maintains a log of sent emails.

---

## Features

* Company discovery using Ocean.io
* Lead generation using Prospeo
* LinkedIn profile extraction
* Email discovery
* Lead storage in JSON
* Personalized email generation
* Email delivery via Brevo
* Sent email tracking

---

## Tech Stack

### Backend

* Node.js
* JavaScript
* Axios

### APIs

* Ocean.io API
* Prospeo API
* Brevo API

### Storage

* JSON Files

---

## Project Structure

```text
outreach-pipeline/
│
├── services/
│   ├── oceanService.js
│   ├── prospeoService.js
│   └── brevoService.js
│
├── utils/
│   └── summary.js
│
├── data/
│   ├── leads.json
│   └── sentEmails.json
│
├── .env
├── app.js
├── package.json
└── README.md
```

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd outreach-pipeline
```

Install dependencies:

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the project root:

```env
OCEAN_KEY=your_ocean_api_key
PROSPEO_KEY=your_prospeo_api_key
BREVO_API_KEY=your_brevo_api_key
SENDER_EMAIL=your_verified_email
```

---

## Running the Application

Start the application:

```bash
node app.js
```

Example:

```text
Enter company domain: hubspot.com
```

---

## Workflow

```text
User Input
     ↓
Ocean.io
     ↓
Similar Companies
     ↓
Prospeo
     ↓
Decision Makers
     ↓
Lead Storage
     ↓
Brevo
     ↓
Email Delivery
```

---

## Sample Output

```text
Companies Found : 3
Decision Makers : 5
Emails Resolved : 4

✓ Sent to example@company.com
```

---

## Future Improvements

* React Frontend Dashboard
* CSV Export
* MongoDB Integration
* Email Templates
* Analytics Dashboard
* Scheduling and Follow-ups

---

## Author

Sunil Kumar Bal

Software Development Engineer Intern
