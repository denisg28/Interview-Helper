// Cloudflare Worker REST API for global chat (admin/user)
// Хранение сообщений в памяти (для теста) — для продакшена используйте KV/D1


export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const kvKey = 'MESSAGE_ADMIN';

  if (request.method === 'POST' && url.pathname === '/send') {
      const { role, text } = await request.json();
      if (role && text) {
        // Получить текущие сообщения из KV
        let messages = [];
        try {
          const stored = await env[kvKey].get('chat');
          if (stored) messages = JSON.parse(stored);
        } catch (e) {}
        messages.push({ role, text, time: Date.now() });
        if (messages.length > 100) messages = messages.slice(-100);
        await env[kvKey].put('chat', JSON.stringify(messages));
        return new Response(JSON.stringify({ success: true }), { headers: { 'Content-Type': 'application/json' } });
      }
      return new Response(JSON.stringify({ success: false, error: 'Missing role or text' }), { status: 400 });
    }

    if (request.method === 'POST' && url.pathname === '/clear') {
      await env[kvKey].put('chat', JSON.stringify([]));
      return new Response(JSON.stringify({ success: true }), { headers: { 'Content-Type': 'application/json' } });
    }

    if (request.method === 'GET' && url.pathname === '/messages') {
      let messages = [];
      try {
        const stored = await env[kvKey].get('chat');
        if (stored) messages = JSON.parse(stored);
      } catch (e) {}
      return new Response(JSON.stringify(messages), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
    }

    return new Response('Not found', { status: 404 });
  }
};
