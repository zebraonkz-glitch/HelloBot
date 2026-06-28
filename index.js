require('dotenv').config();

const { Telegraf } = require('telegraf');

const token = process.env.BOT_TOKEN;

if (!token) {
  console.error('Ошибка: переменная BOT_TOKEN не задана в .env');
  process.exit(1);
}

const greetings = [
  'Саламатсiз ба!',
  'Здравствуйте, уважаемые!',
  'Доброе время суток!',
];

const bot = new Telegraf(token);

bot.on('message', (ctx) => {
  const greeting = greetings[Math.floor(Math.random() * greetings.length)];
  ctx.reply(greeting);
});

bot.launch().then(() => {
  console.log('Бот запущен');
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
