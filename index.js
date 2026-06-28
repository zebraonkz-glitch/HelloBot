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

let lastGreeting = null;

function pickGreeting() {
  const available = lastGreeting
    ? greetings.filter((g) => g !== lastGreeting)
    : greetings;
  const greeting = available[Math.floor(Math.random() * available.length)];
  lastGreeting = greeting;
  return greeting;
}

const bot = new Telegraf(token);

bot.on('message', (ctx) => {
  ctx.reply(pickGreeting());
});

bot.launch().then(() => {
  console.log('Бот запущен');
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
