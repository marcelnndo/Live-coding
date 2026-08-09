import React from 'react';
import '../styles/PreviewModal.css';

export default function PreviewModal({ imageUrl, onDownload, onShare, onClose }) {
  return (
    <div className="preview-modal">
      <div className="preview-box">
        <img src={imageUrl} alt="Screenshot Code" />
      </div>
      <div className="preview-actions">
        <button className="preview-btn primary" onClick={onDownload}>download foto</button>
        <button className="preview-btn" onClick={onShare}>bagikan</button>
        <button className="preview-btn" onClick={onClose}>tutup</button>
      </div>
    </div>
  );
}
