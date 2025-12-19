// Cloudflare Worker + Upstash Redis (Free & Fast)
// Redis обеспечивает мгновенную доставку сообщений без задержек KV.

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Получаем настройки из переменных окружения (установите их в Cloudflare Dashboard)
    const redisUrl = env.UPSTASH_REDIS_REST_URL;
    const redisToken = env.UPSTASH_REDIS_REST_TOKEN;

    // Вспомогательная функция для запросов к Redis
    const redisRequest = async (command, ...args) => {
      const res = await fetch(`${redisUrl}/${command}`, {
        method: 'POST',
        headers: { 
          Authorization: `Bearer ${redisToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(args)
      });
      return await res.json();
    };

    // CORS заголовки
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // --- API ---

    if (url.pathname === '/send' && request.method === 'POST') {
      const { role, text } = await request.json();
      if (role && text) {
        const message = { role, text, time: Date.now() };
        
        // RPUSH добавляет элемент в конец списка 'chat_messages'
        await redisRequest('RPUSH', 'chat_messages', JSON.stringify(message));
        // Оставляем только последние 100 сообщений
        await redisRequest('LTRIM', 'chat_messages', -100, -1);

        return new Response(JSON.stringify({ success: true }), { 
          headers: { 'Content-Type': 'application/json', ...corsHeaders } 
        });
      }
      return new Response(JSON.stringify({ success: false }), { status: 400, headers: corsHeaders });
    }

    if (url.pathname === '/clear' && request.method === 'POST') {
      await redisRequest('DEL', 'chat_messages');
      return new Response(JSON.stringify({ success: true }), { 
        headers: { 'Content-Type': 'application/json', ...corsHeaders } 
      });
    }

    if (url.pathname === '/messages' && request.method === 'GET') {
      // LRANGE получает все элементы списка
      const result = await redisRequest('LRANGE', 'chat_messages', 0, -1);
      // Redis возвращает массив строк JSON, нужно их распарсить
      const messages = result.result ? result.result.map(str => JSON.parse(str)) : [];
      
      return new Response(JSON.stringify(messages), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
          ...corsHeaders
        }
      });
    }

    return new Response('Not found', { status: 404, headers: corsHeaders });
  }
};
