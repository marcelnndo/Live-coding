import React, { useState } from 'react';

export default function UxLibrary({ onBackMenu }) {
  const [activeTab, setActiveTab] = useState('colors');

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff', padding: '20px', fontFamily: 'sans-serif' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
        <h1 style={{ margin: 0, fontSize: '24px', color: '#00ff66', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00ff66" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
            <polyline points="2 17 12 22 22 17"></polyline>
            <polyline points="2 12 12 17 22 12"></polyline>
          </svg>
          UX/UI <span style={{ color: '#fff' }}>Library</span>
        </h1>
        <button onClick={onBackMenu} style={{ background: '#333', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer' }}>
          Kembali
        </button>
      </div>

      <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', marginBottom: '20px', paddingBottom: '10px' }}>
        {['colors', 'gradients', 'buttons', 'tutorial'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{ 
              padding: '8px 16px', 
              background: activeTab === tab ? '#00ff66' : '#1a1a1a', 
              color: activeTab === tab ? '#000' : '#888',
              border: '1px solid #333',
              borderRadius: '20px',
              textTransform: 'capitalize',
              fontWeight: 'bold',
              whiteSpace: 'nowrap'
            }}>
            {tab}
          </button>
        ))}
      </div>

      <div style={{ background: '#111', padding: '15px', borderRadius: '8px', border: '1px solid #222' }}>
        
        {activeTab === 'colors' && (
          <div>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="12" r="4"></circle>
              </svg>
              Palet Warna Cyber
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '15px' }}>
              <div style={{ background: '#000000', padding: '20px', borderRadius: '8px', border: '1px solid #333' }}>#000000<br/><small>Pitch Black</small></div>
              <div style={{ background: '#121212', padding: '20px', borderRadius: '8px' }}>#121212<br/><small>Dark Gray</small></div>
              <div style={{ background: '#00ff66', padding: '20px', borderRadius: '8px', color: '#000', fontWeight:'bold' }}>#00ff66<br/><small>Neon Green</small></div>
              <div style={{ background: '#ff0055', padding: '20px', borderRadius: '8px', fontWeight:'bold' }}>#ff0055<br/><small>Neon Pink</small></div>
            </div>
          </div>
        )}

        {activeTab === 'gradients' && (
          <div>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M2 12h20"></path>
              </svg>
              CSS Gradients
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ background: 'linear-gradient(90deg, #ff0055, #0000ff)', padding: '30px', borderRadius: '8px', textAlign: 'center', fontWeight: 'bold' }}>
                linear-gradient(90deg, #ff0055, #0000ff)
              </div>
              <div style={{ background: 'linear-gradient(45deg, #00ff66, #000)', padding: '30px', borderRadius: '8px', textAlign: 'center', fontWeight: 'bold', border: '1px solid #333' }}>
                linear-gradient(45deg, #00ff66, #000)
              </div>
            </div>
          </div>
        )}

        {activeTab === 'buttons' && (
          <div>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="10" rx="2"></rect>
                <circle cx="12" cy="5" r="2"></circle>
                <path d="M12 7v4"></path>
              </svg>
              Desain Button Modern
            </h3>
            <p style={{ color: '#888' }}>Contoh gaya CSS untuk tombol web:</p>
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', padding: '10px 0' }}>
              <button style={{ padding: '12px 24px', background: '#00ff66', color: '#000', border: 'none', borderRadius: '5px', fontWeight: 'bold', boxShadow: '0 0 10px #00ff66' }}>Neon Glow</button>
              <button style={{ padding: '12px 24px', background: 'transparent', color: '#fff', border: '2px solid #fff', borderRadius: '25px', fontWeight: 'bold' }}>Outline Pill</button>
              <button style={{ padding: '12px 24px', background: '#222', color: '#00ff66', border: 'none', borderRadius: '5px', borderBottom: '3px solid #00ff66' }}>Bottom Accent</button>
            </div>
          </div>
        )}

        {activeTab === 'tutorial' && (
          <div>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
              HTML/CSS Snippets
            </h3>
            <div style={{ background: '#000', padding: '15px', borderRadius: '8px', border: '1px solid #333', fontFamily: 'monospace', color: '#ddd' }}>
              <p style={{ color: '#00ff66', margin: '0 0 10px 0' }}>// Cara membuat teks ke tengah (CSS Flexbox)</p>
              .container {'{'}<br/>
              &nbsp;&nbsp;display: flex;<br/>
              &nbsp;&nbsp;justify-content: center;<br/>
              &nbsp;&nbsp;align-items: center;<br/>
              &nbsp;&nbsp;height: 100vh;<br/>
              {'}'}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
