import React, { useState } from 'react';

const buttonStyle = {
  padding: '10px 28px',
  borderRadius: '8px',
  border: 'none',
  background: '#fff',
  color: '#222',
  fontWeight: 600,
  fontSize: '1.08em',
  cursor: 'pointer',
  boxShadow: '0 2px 16px #000',
  marginRight: '18px',
  marginBottom: '8px',
  transition: 'background 0.18s, color 0.18s',
};

const buttonHover = {
  background: 'rgba(255,255,255,0.85)',
  color: '#007aff',
};

export default function RoleSelect({ onSelect }) {
  const [role, setRole] = useState('user');
  const [hovered, setHovered] = useState(null);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: 80,
      background: '#222',
      borderRadius: '12px',
      boxShadow: '0 2px 16px #000',
      padding: '32px',
      maxWidth: 420,
      marginLeft: 'auto',
      marginRight: 'auto',
      fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
      color: '#fff',
      textAlign: 'center',
    }}>
      <h2 style={{ fontWeight: 700, fontSize: '2em', marginBottom: 24, color: '#fff' }}>Выберите роль</h2>
      <div style={{ margin: 16, display: 'flex', gap: 16, justifyContent: 'center' }}>
        <button
          style={{ ...buttonStyle, ...(hovered === 'user' ? buttonHover : {}) }}
          onMouseEnter={() => setHovered('user')}
          onMouseLeave={() => setHovered(null)}
          onClick={() => { setRole('user'); onSelect('user'); }}
        >Пользователь</button>
        <button
          style={{ ...buttonStyle, marginRight: 0, background: '#fff', color: '#222', ...(hovered === 'admin' ? buttonHover : {}) }}
          onMouseEnter={() => setHovered('admin')}
          onMouseLeave={() => setHovered(null)}
          onClick={() => { setRole('admin'); onSelect('admin'); }}
        >Админ</button>
      </div>
    </div>
  );
}
