import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import Editor from '@monaco-editor/react';
import PreviewModal from './PreviewModal';
import '../styles/EditorApp.css';

export default function EditorApp({ onBackMenu }) {
  const [language, setLanguage] = useState('html');
  const [activeTab, setActiveTab] = useState('editor');
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

  // Dinamis merender hasil berdasarkan bahasa (Mesin Python diganti agar SUPER CEPAT)
  const getPreviewContent = () => {
    if (language === 'python') {
      return `
        <!DOCTYPE html>
        <html>
          <head>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/brython/3.11.3/brython.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/brython/3.11.3/brython_stdlib.min.js"></script>
            <style>
              body { background: #000; color: #00ff66; font-family: 'Courier New', monospace; padding: 15px; margin: 0; font-size: 14px; }
              #output { white-space: pre-wrap; margin: 0; }
            </style>
          </head>
          <body onload="brython()">
            <pre id="output">Output Terminal Python:\n------------------------\n</pre>
            <script type="text/python">
              import sys
              from browser import document
              
              # Redirect print() python ke dalam HTML
              class MyOutput:
                  def write(self, text):
                      document["output"].text += text
                  def flush(self):
                      pass
                      
              sys.stdout = MyOutput()
              sys.stderr = MyOutput()

              # Eksekusi kode user:
              ${code}
            </script>
          </body>
        </html>
      `;
    }
    if (language === 'php') {
      return `
        <body style="background:#1e1e1e; color:#fff; padding:20px; font-family:sans-serif; margin:0;">
          <h3 style="color:#ffcc00;">Info PHP Mode</h3>
        </body>
      `;
    }
    return code; 
  };

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    if (lang === 'python') {
      setCode(`import time\n\nprint("Halo dari Python!")\nprint("Ngoding di HP ternyata lancar jaya.")\n\n# Bikin lirik berulang\nfor i in range(3):\n    print(f"Lirik ke-{i+1} viral tiktok...")`);
    } else if (lang === 'php') {
      setCode(`<?php\n  echo "Halo Dunia dari PHP!";\n?>`);
    } else {
      setCode(`<h1>Halo Dunia</h1>`);
    }
  };

  return (
    <div className="app" style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', backgroundColor: '#1e1e1e', overflow: 'hidden' }}>
      
      {/* Header Statis */}
      <div className="header" style={{ flexShrink: 0 }}>
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

      {/* Kontrol Tab & Bahasa (Menempel Penuh) */}
      <div style={{ flexShrink: 0, display: 'flex', gap: '8px', padding: '10px 15px', background: '#252526', borderBottom: '1px solid #333' }}>
        <select value={language} onChange={handleLanguageChange} style={{ flex: 1, padding: '10px', background: '#333', color: '#fff', border: '1px solid #444', borderRadius: '4px', outline: 'none' }}>
          <option value="html">HTML / JS / CSS</option>
          <option value="python">Python (Terminal)</option>
          <option value="php">PHP</option>
        </select>
        
        <button 
          onClick={() => setActiveTab('editor')} 
          style={{ flex: 1, padding: '10px', background: activeTab === 'editor' ? '#00ff66' : '#333', color: activeTab === 'editor' ? '#000' : '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Ngoding
        </button>
        <button 
          onClick={() => setActiveTab('preview')} 
          style={{ flex: 1, padding: '10px', background: activeTab === 'preview' ? '#00ff66' : '#333', color: activeTab === 'preview' ? '#000' : '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Hasil
        </button>
      </div>

      {/* Area Kerja Fleksibel (Otomatis Full Screen Tanpa Kepotong) */}
      <div style={{ flex: 1, minHeight: 0, position: 'relative' }}>
        {activeTab === 'editor' && (
          <div style={{ height: '100%', width: '100%' }}>
            <Editor
              height="100%"
              language={language}
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || '')}
              options={{ 
                minimap: { enabled: false }, 
                fontSize: 14, 
                wordWrap: "on",
                padding: { top: 15 }
              }}
            />
          </div>
        )}

        {activeTab === 'preview' && (
          <div style={{ height: '100%', width: '100%', backgroundColor: '#fff' }}>
            <iframe 
              srcDoc={getPreviewContent()} 
              title="output" 
              style={{ width: '100%', height: '100%', border: 'none', display: 'block' }} 
            />
          </div>
        )}
      </div>

      {/* Hidden VS Code Template untuk Screenshot (JANGAN DIHAPUS) */}
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
