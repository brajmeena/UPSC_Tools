# UPSC QCAB Generator

A fully client-side static web application that generates UPSC-style **Question Cum Answer Booklets (QCABs)** — deployable directly on GitHub Pages.

---

## Features

- 📚 **PYQ Database** — 90+ official UPSC questions (2017–2024) across GS1–GS4, Essay, Geography Optional
- 🔍 **Filter & Search** — Filter by Year, Paper, Subject, Subtopic; search across all fields
- ☑️ **Select & Generate** — Checkbox-select any questions, then generate a PDF
- ✏️ **Custom Questions** — Paste your own questions in flexible formats
- 📄 **Authentic QCAB Layout** — Matches UPSC specimen: left margin line, right "Candidates must not write on this margin" note, footer code, page numbers, blank answer pages

---

## Project Structure

```
QCAB/
├── index.html          # Single-page app shell
├── styles.css          # Full stylesheet (editorial theme)
├── app.js              # All application logic (modular)
├── data/
│   └── questions.json  # PYQ database
└── README.md
```

---

## Installation & Running Locally

No build tools required. Just open in a browser:

```bash
# Option 1: Python HTTP server
cd QCAB
python3 -m http.server 8080
# Open http://localhost:8080

# Option 2: Node.js live-server
npx live-server QCAB

# Option 3: VS Code Live Server extension
# Right-click index.html → Open with Live Server
```

> **Note:** Must be served via HTTP (not `file://`) due to the `fetch('./data/questions.json')` call.

---

## GitHub Pages Deployment

1. Create a GitHub repository
2. Push all files to the `main` branch (keeping directory structure intact)
3. Go to **Settings → Pages → Source → Deploy from branch → main / root**
4. Your app will be live at `https://<username>.github.io/<repo-name>/`

---

## Database Format (`data/questions.json`)

Each question object follows this schema:

```json
{
  "id": 1,
  "year": 2024,
  "paper": "GS1",
  "subject": "Geography",
  "subtopic": "Climatology",
  "keywords": ["monsoon", "rainfall", "climate"],
  "qno": "Q1",
  "question": "Discuss Indian Monsoon variability.",
  "marks": 15,
  "source": "UPSC"
}
```

### Supported Papers
`GS1`, `GS2`, `GS3`, `GS4`, `Essay`, `Geography Optional P1`, `Geography Optional P2`

### Supported Marks Values
`10`, `15`, `20` (and any integer — page count scales accordingly)

### Page Count Logic
| Marks | Total Pages (including question page) |
|-------|---------------------------------------|
| 10    | 2                                     |
| 15    | 3                                     |
| 20    | 4                                     |
| Other | `⌈marks/5⌉ + 1`                       |

---

## Custom Question Format

Paste questions in any of these formats (one per line):

```
Q1. Explain Plate Tectonics. [15]
2. Discuss Indian Monsoon. [10]
Q3. Analyse urban flooding. (15)
4. Discuss federalism in India. 15 marks
```

Rules:
- Line must start with optional `Q` then a number and `.` or `)`
- Marks must appear at end in `[n]`, `(n)`, or `n marks` format
- One question per line; blank lines are ignored

---

## PDF Layout Reference

Based on the official UPSC specimen QCAB:

```
| Q1. | Question text here…          Marks |  Candidates   |
|     |                                    |  must not     |
|     |                                    |  write on     |
|     | (blank answer space)               |  this margin  |
|     |                                    |               |
|_____|____________________________________|               |
  XXX-X-GS/0000              4
```

- **Left margin line** at ~22mm from left edge
- **Right margin line** at ~186mm (right-side note area: 186–210mm)
- **Question number** sits outside (left of) the left margin line
- **Footer**: booklet code bottom-left, page number bottom-centre
- **Answer pages**: identical frame + footer, no question text

---

## Configuring the Footer Code

In the PDF Settings modal, enter any code:
- `XXX-X-GS1/24` — for GS1, 2024 practice
- `XXX-X-GEO/24` — for Geography Optional
- Leave default `XXX-X-GS/0000` for generic use

---

## Tech Stack

| Component       | Technology                           |
|----------------|--------------------------------------|
| Markup          | HTML5                                |
| Styling         | CSS3 (custom properties, grid, flex) |
| Logic           | Vanilla JavaScript ES6+ (modules pattern) |
| PDF Generation  | [jsPDF 2.5.1](https://github.com/parallax/jsPDF) via CDN |
| Fonts           | Google Fonts (EB Garamond, Instrument Sans, DM Mono) |

No frameworks. No build tools. No backend. Works offline after first load (fonts excluded).

---

## Extending the Database

To add more questions, simply append objects to `data/questions.json` following the schema above. The app auto-populates all filter dropdowns from the data at runtime.

---

## License

For personal study and practice only. Not affiliated with UPSC.
