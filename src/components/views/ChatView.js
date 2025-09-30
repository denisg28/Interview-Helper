import React, { useState, useEffect, useRef } from 'react';

export default function ChatView({ role }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const wsRef = useRef(null);

  useEffect(() => {
    wsRef.current = new window.WebSocket('ws://localhost:8080');
    wsRef.current.onopen = () => {
      wsRef.current.send(JSON.stringify({ type: 'role', role }));
    };
    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'chat') {
        setMessages((prev) => [...prev, { from: data.from, text: data.text }]);
      }
    };
    return () => {
      wsRef.current.close();
    };
  }, [role]);

  const sendMessage = () => {
    if (input.trim() && wsRef.current?.readyState === 1) {
      wsRef.current.send(JSON.stringify({ type: 'chat', text: input }));
      setMessages((prev) => [...prev, { from: role, text: input }]);
      setInput('');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ marginBottom: 8, textAlign: msg.from === role ? 'right' : 'left' }}>
            <b>{msg.from === role ? 'Вы' : msg.from === 'admin' ? 'Админ' : 'Пользователь'}:</b> {msg.text}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', padding: 16 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          style={{ flex: 1, marginRight: 8 }}
          placeholder="Введите сообщение..."
          onKeyDown={e => { if (e.key === 'Enter') sendMessage(); }}
        />
        <button onClick={sendMessage}>Отправить</button>
      </div>
    </div>
  );
}
