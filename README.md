# Mikkel Martinus Fahnoee – Portfolio

A personal portfolio website built with **React**, **Vite**, and **Tailwind CSS**.

## Live Site

- **GitHub Pages:** https://fahnoee.github.io

## Features

- Single-page portfolio layout
- Sections for Hero, Projects, Skills, and Contact
- Responsive styling with Tailwind CSS
- Easy-to-edit content through data files in `src/data`

## Tech Stack

- React 18
- Vite 5
- Tailwind CSS
- ESLint
- GitHub Pages (`gh-pages`)

## Project Structure

```text
src/
  components/      # UI sections (Hero, Projects, Skills, Contact)
  data/            # Portfolio content (personal info, skills, projects)
  images/          # Static image assets used by projects
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

```bash
npm install
```

### Run in Development

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Linting

```bash
npm run lint
```

## Deployment

This repo is configured to deploy the `dist` folder to GitHub Pages.

```bash
npm run deploy
```

The deployment flow automatically runs `npm run build` via `predeploy`.

## Customizing Portfolio Content

Update these files to personalize the portfolio:

- `src/data/personal.js`
- `src/data/projects.js`
- `src/data/skills.js`

## License

This project is for personal portfolio use.
