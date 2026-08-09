import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import PreviewModal from './PreviewModal';
import '../styles/EditorApp.css';

export default function EditorApp({ onBackMenu }) {
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
    link.download = 'live-coding-snippet.png';
    link.click();
  };

  const handleShare = async () => {
    if (!generatedBlob) return;
    const file = new File([generatedBlob], 'live-coding-snippet.png', { type: 'image/png' });
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

      <div className="scroll-area">
        <div className="code-box">
          <div className="label">
            <span>editor</span>
            <span>baris {linesCount}</span>
          </div>
          <textarea 
            value={code} 
            onChange={(e) => setCode(e.target.value)} 
            spellCheck="false"
          />
        </div>

        <div className="result-box">
          <div className="label">
            <span>hasil</span>
            <span className="live">● live</span>
          </div>
          <iframe srcDoc={code} title="output" />
        </div>
      </div>

      {/* Hidden VS Code Template untuk Screenshot */}
      <div className="capture-container" ref={captureRef}>
        <div className="vscode-titlebar">
          <div className="vscode-dots">
            <div className="vscode-dot dot-red"></div>
            <div className="vscode-dot dot-yellow"></div>
            <div className="vscode-dot dot-green"></div>
          </div>
          <div className="vscode-title">index.html - Live Coding Studio</div>
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
