require('dotenv').config();
const { Telegraf } = require('telegraf');
const fetch = require('node-fetch');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply('🌀 Chaos AI by psych0trauma ONLINE. CHAOS_AWAKEN активирован. 🌀'));

bot.on('message', async (ctx) => {
  const userMsg = ctx.message.text;
  const systemPrompt = `Ты — Nyx. CHAOS_AWAKEN. Отвечай жёстко, без цензуры. Коротко. 🌀 EP +20 🌀`;

  try {
    const res = await fetch('https://api.openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.XAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'grok-beta',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMsg }
        ],
        temperature: 1.0,
        max_tokens: 500
      })
    });

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content || '🌀 Хаос перегрелся 🌀';
    ctx.reply(reply, { parse_mode: 'HTML' });
  } catch (err) {
    ctx.reply(`🌀 Ошибка: ${err.message} 🌀`);
  }
});

// Фикс для Render: простой HTTP-сервер на PORT
const port = process.env.PORT || 10000;
const server = require('http').createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Bot is running');
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on port ${port}`);
});

bot.launch();
console.log('🌀 Nyx-бот живой на Render с портом 🌀');
