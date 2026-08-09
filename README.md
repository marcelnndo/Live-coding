# Live Coding

A lightweight, client-side live coding environment built with React, Vite, and Modern CSS. Designed for rapid prototyping, testing HTML/CSS/JS snippets directly in the browser, and capturing stylish VS Code-like code snapshots.

## ✨ Features

- **Live Preview:** Real-time rendering of HTML, CSS, and JavaScript inside an isolated iframe.
- **Client-Side Processing:** 100% runs locally in your browser. No server storage, total privacy.
- **VS Code Snapshot Generator:** Convert your code snippets into clean, shareable high-resolution images complete with syntax line numbers and window controls.
- **Responsive & Lightweight:** Optimized for both mobile devices (including Termux environments) and desktop screens.

---

## 📂 Project Structure

```text
live-coding-react/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── SplashScreen.jsx
│   │   ├── HomeMenu.jsx
│   │   ├── PrivacyModal.jsx
│   │   ├── EditorApp.jsx
│   │   └── PreviewModal.jsx
│   ├── styles/
│   │   ├── Global.css
│   │   ├── SplashScreen.css
│   │   ├── HomeMenu.css
│   │   ├── PrivacyModal.css
│   │   ├── EditorApp.css
│   │   └── PreviewModal.css
│   ├── App.jsx
│   ├── main.jsx
│   └── vite.config.js
├── package.json
└── README.md
