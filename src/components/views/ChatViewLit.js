import { html, css, LitElement } from '../../assets/lit-core-2.7.4.min.js';

export class ChatViewLit extends LitElement {
  static styles = css`
    :host {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: none;
      z-index: 9999;
    }
    .chat-container {
      display: flex;
      flex-direction: column;
      .chat-container {
        display: flex;
        flex-direction: column;
        min-height: 420px;
        max-height: 80vh;
        background: #222;
        color: #fff;
        border-radius: 12px;
        max-width: 540px;
        width: 100%;
        margin: 0 auto;
        font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
        box-shadow: 0 2px 16px #000;
        overflow: visible;
      }
      min-height: 420px;
      max-height: 80vh;
      background: transparent;
      color: #fff;
      border-radius: 16px;
      max-width: 540px;
      width: 100%;
      margin: 0 auto;
      font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
      .input-row {
        display: flex;
        padding: 16px;
        border-top: 1px solid #333;
        background: #222;
        border-radius: 0 0 12px 12px;
        box-shadow: 0 -2px 8px #000;
        backdrop-filter: blur(8px);
      }
      box-shadow: 0 4px 24px rgba(0,0,0,0.18);
      overflow: visible;
    }
    .messages {
      flex: 1;
      padding: 24px 16px 8px 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      align-items: flex-start;
      overflow: visible;
    }
      button {
        padding: 10px 22px;
        border-radius: 8px;
        border: none;
        background: #fff;
        color: #222;
        font-weight: 600;
        font-size: 1em;
        cursor: pointer;
        box-shadow: 0 2px 16px #000;
        transition: background 0.18s, color 0.18s;
      }
    .input-row {
      display: flex;
      padding: 16px;
      button:hover {
        background: rgba(255,255,255,0.85);
        color: #007aff;
      }
      border-top: 1px solid #333;
      background: rgba(40,44,52,0.35);
      border-radius: 0 0 16px 16px;
      box-shadow: 0 -2px 8px rgba(0,0,0,0.08);
      backdrop-filter: blur(8px);
    }
    input {
      flex: 1;
      padding: 10px 14px;
      border-radius: 8px;
      border: none;
      margin-right: 12px;
      input, textarea {
        flex: 1;
        padding: 10px 14px;
        border-radius: 8px;
        border: none;
        margin-right: 12px;
        background: #222;
        color: #fff;
        font-size: 1em;
        outline: none;
        box-shadow: 0 1px 4px #000;
      }
      background: #18191a;
      color: #fff;
      font-size: 1em;
      outline: none;
      box-shadow: 0 1px 4px rgba(0,0,0,0.08);
    }
    button {
      padding: 10px 22px;
      border-radius: 8px;
      border: none;
      background: linear-gradient(90deg, #3a7afe 0%, #1e90ff 100%);
      color: #fff;
      font-weight: 500;
      font-size: 1em;
      cursor: pointer;
      .msg-bubble {
        background: #fff;
        color: #222;
        border-radius: 12px;
        padding: 12px 16px;
        font-size: 16px;
        box-shadow: 0 2px 16px #000;
        width: 100%;
        text-align: left;
        word-break: break-word;
        white-space: pre-line;
        border: 1px solid rgba(0,0,0,0.08);
        margin: 0;
        overflow-x: auto;
      }
      box-shadow: 0 2px 8px rgba(58,122,254,0.12);
      transition: background 0.2s;
    }
    button:hover {
      background: linear-gradient(90deg, #1e90ff 0%, #3a7afe 100%);
    }
    .msg {
      display: flex;
      align-items: flex-end;
      gap: 10px;
      word-break: break-word;
      max-width: 100%;
      margin-left: 0;
      margin-right: 0;
      flex-direction: row;
      justify-content: flex-start;
    }
    .msg-bubble {
      background: rgba(40,44,52,0.55);
      color: #fff;
      border-radius: 16px;
      padding: 12px 16px;
      font-size: 16px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.10);
      width: 100%;
      text-align: left;
      word-break: break-word;
      white-space: pre-line;
      border: 1px solid rgba(255,255,255,0.08);
      margin: 0;
      overflow-x: auto;
    }
      .msg-bubble {
        background: rgba(40,44,52,0.55);
        color: #fff;
        border-radius: 16px;
        padding: 12px 16px;
        font-size: 16px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.10);
        width: 100%;
        text-align: left;
        word-break: break-word;
        white-space: pre-line;
        border: 1px solid rgba(255,255,255,0.08);
      }
      .msg-bubble :is(p, ul, ol, pre, code, blockquote, h1, h2, h3, h4, h5, h6) {
        margin: 0.5em 0;
        text-align: left;
        word-break: break-word;
        white-space: pre-line;
      }
      .msg-bubble pre, .msg-bubble code {
        background: #23272e;
        color: #e6e6e6;
        border-radius: 8px;
        padding: 8px;
        font-size: 15px;
        overflow-x: auto;
        font-family: 'JetBrains Mono', 'Fira Mono', 'Consolas', monospace;
      }
      .msg-bubble a {
        color: #6cb4ff;
        text-decoration: underline;
        word-break: break-all;
      }
    .avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: #3a7afe;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 1.1em;
      color: #fff;
      box-shadow: 0 2px 8px rgba(58,122,254,0.12);
    }
    .bubble {
      padding: 12px 18px;
      border-radius: 16px;
      background: #18191a;
      color: #fff;
      font-size: 1em;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      position: relative;
    }
    .msg.user .bubble {
      background: linear-gradient(90deg, #3a7afe 0%, #1e90ff 100%);
      color: #fff;
    }
    .msg.admin .bubble {
      background: #232526;
      color: #fff;
    }
    .role-label {
      font-size: 0.85em;
      opacity: 0.7;
      margin-bottom: 2px;
    }
  `;

  static properties = {
    role: { type: String },
    messages: { type: Array },
    input: { type: String },
    ws: { type: Object },
  };

  // Cloudflare Worker REST API endpoint
  apiUrl = 'https://interview-helper-admin.denisg28g.workers.dev';

  constructor() {
    super();
    this.role = 'user';
    this.messages = [];
    this.input = '';
    this.pollInterval = null;
  }

  firstUpdated() {
    this._lastMsgText = '';
    this.loadMessages();
    this.pollInterval = setInterval(() => this.loadMessages(), 100);
    setTimeout(() => this.scrollToLastMsg(), 300);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.pollInterval) clearInterval(this.pollInterval);
  }

  async loadMessages() {
    const prevLastMsg = this.messages.length ? this.messages[this.messages.length - 1] : null;
    try {
      const res = await fetch(this.apiUrl + '/messages', { cache: 'no-store' });
      if (res.ok) {
        this.messages = await res.json();
      }
    } catch (e) {}
    this.requestUpdate();
    
    const newLastMsg = this.messages.length ? this.messages[this.messages.length - 1] : null;
    // Scroll if new message appears (different time or text)
    if (newLastMsg && (!prevLastMsg || newLastMsg.time !== prevLastMsg.time || newLastMsg.text !== prevLastMsg.text)) {
      setTimeout(() => this.scrollToLastMsg(), 0);
    }
  }
  // Автоскролл только при первом открытии, не при каждом обновлении

  scrollToLastMsg() {
    // Прокрутка к последнему сообщению
    const lastMsg = this.renderRoot.querySelector('.messages > .msg:last-child');
    if (lastMsg) {
      lastMsg.scrollIntoView({ behavior: 'auto', block: 'end' });
    }
  }

  async sendMessage() {
    if (this.input.trim()) {
      await fetch(this.apiUrl + '/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: this.role, text: this.input })
      });
      this.input = '';
      this.loadMessages();
    }
  }

  async sendHelpRequest() {
    await fetch(this.apiUrl + '/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: this.role, text: '🆘 ПОЛЬЗОВАТЕЛЬ ЗАПРОСИЛ ПОМОЩЬ!' })
    });
    await this.loadMessages();
    setTimeout(() => this.scrollToLastMsg(), 100);
  }

  render() {
    return html`
      <div class="chat-container">
        <div class="messages">
          ${this.messages.map(msg => html`
            <div class="msg ${msg.role === 'admin' ? 'admin' : 'user'}">
              <div class="avatar" title="${msg.role === 'admin' ? 'Админ' : 'Пользователь'}">
                ${msg.role === 'admin' ? 'A' : 'U'}
              </div>
              <div>
                <div class="role-label">${msg.role === 'admin' ? 'Админ' : 'Пользователь'}</div>
                  <div class="msg-bubble" .innerHTML=${this.formatMessage(msg.text)}></div>
              </div>
            </div>
          `)}
        </div>
        ${this.role === 'admin' ? html`
          <div class="input-row">
            <textarea
              .value=${this.input}
              @input=${e => this.input = e.target.value}
              @keydown=${e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); this.sendMessage(); } }}
              placeholder="Введите сообщение..."
              style="flex:1;padding:10px 14px;border-radius:8px;border:none;margin-right:12px;background:#18191a;color:#fff;font-size:1em;outline:none;box-shadow:0 1px 4px rgba(0,0,0,0.08);resize:vertical;min-height:48px;max-height:180px;"
            ></textarea>
            <button @click=${() => this.sendMessage()}>Отправить</button>
            <button @click=${() => this.clearChat()} style="margin-left:12px;background:linear-gradient(90deg,#ff4e50 0%,#f9d423 100%);color:#fff;">Очистить чат</button>
          </div>
        ` : html`
          <div class="input-row" style="justify-content: center; padding: 10px;">
            <button @click=${() => this.sendHelpRequest()} style="background: #d32f2f; color: white; font-weight: bold; padding: 12px 24px; font-size: 1.1em; border: none; border-radius: 8px; cursor: pointer; box-shadow: 0 4px 6px rgba(0,0,0,0.3); transition: background 0.2s;">
              🆘 Нужна помощь
            </button>
          </div>
        `}
      </div>
    `;

  }

  formatMessage(text) {
    // Преобразовать markdown-like в HTML (минимально: заголовки, списки, переносы строк)
    let html = text
      .replace(/\n/g, '<br>')
      .replace(/### (.*?)(<br>|$)/g, '<h3 style="margin:8px 0 4px 0;font-size:1.1em;color:#3a7afe;">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
      .replace(/\* (.*?)(<br>|$)/g, '<li style="margin-left:18px;">$1</li>')
      .replace(/---/g, '<hr style="margin:12px 0;border:none;border-top:1.5px solid #3a7afe;">')
      .replace(/✅/g, '<span style="font-size:1.2em;">✅</span>')
      .replace(/👍/g, '<span style="font-size:1.2em;">👍</span>');
    // Обернуть списки в <ul>
    html = html.replace(/(<li[\s\S]*?<\/li>)/g, '<ul>$1</ul>');
    return html;
  }

  async clearChat() {
    await fetch(this.apiUrl + '/clear', { method: 'POST' });
    this.loadMessages();
  }
}

customElements.define('chat-view-lit', ChatViewLit);
