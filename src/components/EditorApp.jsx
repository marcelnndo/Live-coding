import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import Editor from '@monaco-editor/react'; // Mesin VSCode
import PreviewModal from './PreviewModal';
import '../styles/EditorApp.css';

export default function EditorApp({ onBackMenu }) {
  const [language, setLanguage] = useState('html');
  const [activeTab, setActiveTab] = useState('editor'); // 'editor' atau 'preview'
  const [code, setCode] = useState(
`<!DOCTYPE html>
<html>
<body>
  <div class="box">
    <h1>halo dunia</h1>
  </div>
</body>
</html>`
  );
  
  const [previewImg, setPreviewImg] = useState(null);
  const [generatedBlob, setGeneratedBlob] = useState(null);
  const captureRef = useRef(null);

  const linesCount = code.split('\n').length;

  const handleScreenshot = async () => {
    if (!captureRef.current) return;
    const canvas = await html2canvas(captureRef.current, { scale: 2, backgroundColor: null });
    canvas.toBlob((blob) => {
      setGeneratedBlob(blob);
      setPreviewImg(URL.createObjectURL(blob));
    }, 'image/png');
  };

  const handleDownload = () => {
    if (!generatedBlob) return;
    const link = document.createElement('a');
    link.href = URL.createObjectURL(generatedBlob);
    link.download = `live-coding-${language}.png`;
    link.click();
  };

  const handleShare = async () => {
    if (!generatedBlob) return;
    const file = new File([generatedBlob], `live-coding-${language}.png`, { type: 'image/png' });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({ title: 'Live Coding Snippet', files: [file] });
      } catch (err) {
        console.log('Share dibatalkan');
      }
    } else {
      alert('Share langsung tidak didukung browser ini, gunakan download.');
    }
  };

  // Dinamis merender hasil berdasarkan bahasa
  const getPreviewContent = () => {
    if (language === 'python') {
      return `
        <!DOCTYPE html>
        <html>
          <head>
            <link rel="stylesheet" href="https://pyscript.net/releases/2024.1.1/core.css">
            <script type="module" src="https://pyscript.net/releases/2024.1.1/core.js"></script>
          </head>
          <body style="background:#fff; color:#000; padding:10px; font-family:monospace;">
            <i>Mengeksekusi Python...</i>
            <py-script>${code}</py-script>
          </body>
        </html>
      `;
    }
    if (language === 'php') {
      return `
        <body style="background:#fff; color:#333; padding:20px; font-family:sans-serif;">
          <h3>Mode Preview PHP</h3>
          <p>Karena PHP berjalan di server, kode tidak dieksekusi di browser secara langsung. Namun syntax kamu sudah berwarna!</p>
          <pre style="background:#eee; padding:10px; border-radius:5px;">${code}</pre>
        </body>
      `;
    }
    return code; // Default HTML/JS/CSS
  };

  // Template awal jika ganti bahasa
  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    if (lang === 'python') setCode(`print("Halo Dunia dari Python!")\nprint("Bisa pakai animasi loh!")`);
    if (lang === 'php') setCode(`<?php\n  echo "Halo Dunia dari PHP!";\n?>`);
    if (lang === 'html') setCode(`<h1>Halo Dunia</h1>`);
  };

  return (
    <div className="app">
      <div className="header">
        <div className="header-left">
          <svg viewBox="0 0 24 24">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
          <h1>live <span>coding</span></h1>
        </div>
        <div className="header-right">
          <button className="action-btn" onClick={handleScreenshot}>[ ss vscode ]</button>
          <button className="action-btn" onClick={onBackMenu}>menu</button>
        </div>
      </div>

      {/* Kontrol Tab & Bahasa */}
      <div className="editor-controls" style={{ display: 'flex', gap: '10px', padding: '0 20px', marginBottom: '10px' }}>
        <select value={language} onChange={handleLanguageChange} style={{ padding: '8px', background: '#333', color: '#fff', border: '1px solid #555', borderRadius: '4px' }}>
          <option value="html">HTML / JS / CSS</option>
          <option value="python">Python (PyScript)</option>
          <option value="php">PHP</option>
        </select>
        
        <button 
          onClick={() => setActiveTab('editor')} 
          style={{ padding: '8px 15px', background: activeTab === 'editor' ? '#00ff66' : '#333', color: activeTab === 'editor' ? '#000' : '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Ngoding
        </button>
        <button 
          onClick={() => setActiveTab('preview')} 
          style={{ padding: '8px 15px', background: activeTab === 'preview' ? '#00ff66' : '#333', color: activeTab === 'preview' ? '#000' : '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Lihat Hasil
        </button>
      </div>

      <div className="scroll-area" style={{ height: 'calc(100vh - 140px)', padding: '0 20px' }}>
        {activeTab === 'editor' && (
          <div className="code-box" style={{ height: '100%', border: '1px solid #333', borderRadius: '8px', overflow: 'hidden' }}>
            <Editor
              height="100%"
              language={language}
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || '')}
              options={{ minimap: { enabled: false }, fontSize: 14, wordWrap: "on" }}
            />
          </div>
        )}

        {activeTab === 'preview' && (
          <div className="result-box" style={{ height: '100%', background: '#fff', borderRadius: '8px', overflow: 'hidden' }}>
            <iframe srcDoc={getPreviewContent()} title="output" style={{ width: '100%', height: '100%', border: 'none' }} />
          </div>
        )}
      </div>

      {/* Hidden VS Code Template untuk Screenshot (TIDAK DIUBAH) */}
      <div className="capture-container" ref={captureRef}>
        <div className="vscode-titlebar">
          <div className="vscode-dots">
            <div className="vscode-dot dot-red"></div>
            <div className="vscode-dot dot-yellow"></div>
            <div className="vscode-dot dot-green"></div>
          </div>
          <div className="vscode-title">snippet.{language} - Live Coding Studio</div>
        </div>
        <div className="vscode-body">
          <div className="vscode-lines">
            {Array.from({ length: linesCount }, (_, i) => i + 1).map(n => (
              <React.Fragment key={n}>{n}<br /></React.Fragment>
            ))}
          </div>
          <div className="vscode-code-content">{code}</div>
        </div>
      </div>

      {previewImg && (
        <PreviewModal 
          imageUrl={previewImg}
          onDownload={handleDownload}
          onShare={handleShare}
          onClose={() => setPreviewImg(null)}
        />
      )}
    </div>
  );
}
