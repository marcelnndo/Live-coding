import React from 'react';
import '../styles/PrivacyModal.css';

export default function PrivacyModal({ onClose }) {
  return (
    <div className="privacy-modal">
      <div className="modal-content">
        <div className="modal-header">Kebijakan & Privasi</div>
        <div className="modal-body">
          <p><strong>1. Pendahuluan</strong><br />Selamat datang di Live Coding. Dokumen kebijakan privasi ini merinci bagaimana aplikasi beroperasi...</p>
          <p><strong>2. Pemrosesan Data Lokal</strong><br />Seluruh kode sumber yang Anda tulis diproses sepenuhnya secara lokal di dalam browser Anda.</p>
          <p><strong>3. Pengumpulan Informasi</strong><br />Kami tidak mengumpulkan informasi identitas pribadi (PII) apapun.</p>
          <h4>Informasi Pengembang</h4>
          <p><strong>Developer:</strong> Open Contributor<br /><strong>Versi:</strong> 2.6.0-react</p>
        </div>
        <button className="modal-close" onClick={onClose}>&lt; kembali</button>
      </div>
    </div>
  );
}
