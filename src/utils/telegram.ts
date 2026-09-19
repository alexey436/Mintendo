export interface LeadData {
  name: string;
  contact: string;
  projectType?: string;
  preferredChannel?: string;
  message?: string;
  comment?: string;
  budget?: number | string;
  timeline?: string;
  selectedOptions?: any[];
  source?: string;
}

const FALLBACK_BOT_TOKEN = '8347960271:AAHNURYPpTPoLn2xCNHnwim2dsxP4wpF5Ao';
const FALLBACK_CHAT_ID = '-5455572359';

function escapeHtml(text: string = ''): string {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export async function sendLeadToTelegram(data: LeadData): Promise<{ ok: boolean; error?: string }> {
  try {
    // 1. Primary: Server-side API endpoint
    const response = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const resJson = await response.json();
      if (resJson.ok) {
        return { ok: true };
      }
    }
  } catch (err) {
    console.warn('Server endpoint /api/lead unreachable, trying direct fallback...', err);
  }

  // 2. Resilient fallback: Direct Telegram API call from client
  try {
    const channelMap: Record<string, string> = {
      telegram: '✈️ Telegram',
      phone: '📞 Телефонний дзвінок',
      whatsapp: '💬 WhatsApp',
    };
    const channelLabel =
      (data.preferredChannel && channelMap[data.preferredChannel]) ||
      data.preferredChannel ||
      'Будь-який';

    const kyivTime = new Intl.DateTimeFormat('uk-UA', {
      timeZone: 'Europe/Kyiv',
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date());

    let text = `🚀 <b>Нова заявка з сайту Mintendo Studio</b>\n\n`;
    text += `👤 <b>Клієнт:</b> ${escapeHtml(data.name)}\n`;
    text += `📞 <b>Контакт:</b> <code>${escapeHtml(data.contact)}</code>\n`;
    text += `💬 <b>Зручний канал:</b> ${channelLabel}\n`;
    text += `🎯 <b>Тип проєкту:</b> ${escapeHtml(data.projectType || 'Консультація / Аудит')}\n`;

    if (data.budget) {
      text += `💰 <b>Розрахунковий бюджет:</b> $${escapeHtml(String(data.budget))}\n`;
    }
    if (data.timeline) {
      text += `⏱ <b>Орієнтовний термін:</b> ${escapeHtml(String(data.timeline))}\n`;
    }
    if (Array.isArray(data.selectedOptions) && data.selectedOptions.length > 0) {
      text += `🧩 <b>Обрані опції:</b>\n`;
      data.selectedOptions.forEach((opt: any) => {
        const optTitle = typeof opt === 'string' ? opt : opt?.title || JSON.stringify(opt);
        text += `  • ${escapeHtml(optTitle)}\n`;
      });
    }
    const commentText = (data.message || data.comment || '').trim();
    if (commentText) {
      text += `\n📝 <b>Коментар / Посилання:</b>\n<i>${escapeHtml(commentText)}</i>\n`;
    }
    text += `\n📍 <b>Джерело:</b> ${escapeHtml(data.source || 'Форма на сайті')}\n`;
    text += `🕒 <b>Час:</b> ${kyivTime} (Київ)`;

    const fallbackUrl = `https://api.telegram.org/bot${FALLBACK_BOT_TOKEN}/sendMessage`;
    const fbRes = await fetch(fallbackUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: FALLBACK_CHAT_ID,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    });

    const fbData = await fbRes.json();
    if (fbRes.ok && fbData.ok) {
      return { ok: true };
    }
    return { ok: false, error: fbData.description || 'Помилка надсилання в Telegram' };
  } catch (fallbackErr: any) {
    console.error('All Telegram send attempts failed:', fallbackErr);
    return { ok: false, error: fallbackErr.message || 'Помилка зв’язку' };
  }
}
