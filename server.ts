import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { validateName, validateContact } from './src/utils/validation';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const TELEGRAM_BOT_TOKEN =
  process.env.TELEGRAM_BOT_TOKEN || '8347960271:AAHNURYPpTPoLn2xCNHnwim2dsxP4wpF5Ao';
const TELEGRAM_CHAT_ID =
  process.env.TELEGRAM_CHAT_ID || '-5455572359';

function escapeHtml(text: string = ''): string {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

async function startServer() {
  const app = express();

  app.use(express.json());

  // Healthcheck endpoint
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Lead submission endpoint
  app.post('/api/lead', async (req, res) => {
    try {
      const {
        name,
        contact,
        projectType,
        preferredChannel,
        message,
        comment,
        budget,
        timeline,
        selectedOptions,
        source,
      } = req.body;

      if (!name || !contact) {
        return res.status(400).json({
          ok: false,
          error: "Поля 'name' та 'contact' є обов'язковими",
        });
      }

      const nameCheck = validateName(name);
      if (!nameCheck.isValid) {
        return res.status(400).json({
          ok: false,
          error: nameCheck.error || "Некоректне ім'я",
        });
      }

      const contactCheck = validateContact(contact, preferredChannel);
      if (!contactCheck.isValid) {
        return res.status(400).json({
          ok: false,
          error: contactCheck.error || 'Некоректний формат контакту',
        });
      }

      const validContact = contactCheck.formatted;
      const clientComment = (message || comment || '').trim();
      const channelMap: Record<string, string> = {
        telegram: '✈️ Telegram',
        phone: '📞 Телефонний дзвінок',
        whatsapp: '💬 WhatsApp',
      };
      const channelLabel =
        (preferredChannel && channelMap[preferredChannel]) ||
        preferredChannel ||
        'Будь-який';

      // Current time in Kyiv timezone
      const kyivTime = new Intl.DateTimeFormat('uk-UA', {
        timeZone: 'Europe/Kyiv',
        dateStyle: 'medium',
        timeStyle: 'short',
      }).format(new Date());

      // Format Telegram HTML message
      let text = `🚀 <b>Нова заявка з сайту Mintendo Studio</b>\n\n`;
      text += `👤 <b>Клієнт:</b> ${escapeHtml(name.trim())}\n`;
      text += `📞 <b>Контакт:</b> <code>${escapeHtml(validContact)}</code> (${contactCheck.type === 'phone' ? '📱 Номер' : '✈️ Telegram'})\n`;
      text += `💬 <b>Зручний канал:</b> ${channelLabel}\n`;
      text += `🎯 <b>Тип проєкту:</b> ${escapeHtml(projectType || 'Консультація / Аудит')}\n`;

      if (budget) {
        text += `💰 <b>Розрахунковий бюджет:</b> $${escapeHtml(String(budget))}\n`;
      }
      if (timeline) {
        text += `⏱ <b>Орієнтовний термін:</b> ${escapeHtml(String(timeline))}\n`;
      }
      if (Array.isArray(selectedOptions) && selectedOptions.length > 0) {
        text += `🧩 <b>Обрані опції:</b>\n`;
        selectedOptions.forEach((opt: any) => {
          const optTitle = typeof opt === 'string' ? opt : opt?.title || JSON.stringify(opt);
          text += `  • ${escapeHtml(optTitle)}\n`;
        });
      }
      if (clientComment) {
        text += `\n📝 <b>Коментар / Посилання:</b>\n<i>${escapeHtml(clientComment)}</i>\n`;
      }
      text += `\n📍 <b>Джерело:</b> ${escapeHtml(source || 'Форма на сайті')}\n`;
      text += `🕒 <b>Час:</b> ${kyivTime} (Київ)`;

      // Send to Telegram Bot API
      const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      const response = await fetch(telegramUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text,
          parse_mode: 'HTML',
          disable_web_page_preview: true,
        }),
      });

      const tgData = await response.json() as { ok: boolean; description?: string };

      if (!response.ok || !tgData.ok) {
        console.error('Telegram API error:', tgData);
        return res.status(502).json({
          ok: false,
          error: tgData.description || 'Не вдалося надіслати заявку в Telegram',
        });
      }

      return res.json({ ok: true });
    } catch (err: any) {
      console.error('Server error handling lead:', err);
      return res.status(500).json({
        ok: false,
        error: err.message || 'Внутрішня помилка сервера',
      });
    }
  });

  // Vite middleware for development vs static build in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
