import React from 'react';
import '../styles/HomeMenu.css';

export default function HomeMenu({ onStart, onOpenPrivacy }) {
  return (
    <div className="home-menu">
      <div className="bg-code-pattern">
{`<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Live Code Environment</title>
</head>
<body>
  <div class="container">
    <h1>Execute Locally</h1>
  </div>
</body>
</html>`}
      </div>
      <div className="menu-container">
        <div className="menu-logo">live <span>coding</span></div>
        <div className="menu-desc">lightweight client editor</div>
        <div className="menu-actions">
          <button className="menu-btn primary" onClick={onStart}>&gt; buka editor</button>
          <button className="menu-btn" onClick={onOpenPrivacy}>&gt; kebijakan & privasi</button>
        </div>
      </div>
    </div>
  );
}
