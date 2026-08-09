import React from 'react';
import '../styles/HomeMenu.css';

export default function HomeMenu({ onStart, onOpenUx, onOpenPrivacy }) {
  return (
    <div className="home-container">
      <div className="logo-container">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#00ff66" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
        <h1 className="title">live <span className="highlight">coding</span></h1>
        <p className="subtitle">Mulai ketik dan lihat hasilnya secara instan</p>
      </div>
      
      <div className="menu-buttons" style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '30px' }}>
        <button onClick={onStart} className="btn-primary" style={{ padding: '12px 20px', background: '#00ff66', color: '#000', border: 'none', borderRadius: '4px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}>
          Mulai Ngoding
        </button>
        
        <button onClick={onOpenUx} className="btn-secondary" style={{ padding: '12px 20px', background: '#333', color: '#fff', border: '1px solid #444', borderRadius: '4px', fontSize: '16px', cursor: 'pointer' }}>
          UX/UI Library & Tutorial
        </button>
        
        <button onClick={onOpenPrivacy} className="btn-secondary" style={{ padding: '12px 20px', background: 'transparent', color: '#888', border: '1px solid #333', borderRadius: '4px', fontSize: '16px', cursor: 'pointer' }}>
          Kebijakan Privasi
        </button>
      </div>
    </div>
  );
}
