
import OpenAI from 'openai';

export default async function handler(req: Request) {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 });

  const { prompt } = await req.json();
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) return new Response('API Key not configured', { status: 500 });

  try {
    const openai = new OpenAI({ apiKey });
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'Bạn là chuyên gia Thần Số Học. Phân tích dựa trên chỉ số cung cấp, sử dụng tiếng Việt, chi tiết và hữu ích.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.5,
      max_tokens: 2000,
    });
    return new Response(JSON.stringify({ text: completion.choices[0].message.content }), { status: 200 });
  } catch (error) {
    console.error('OpenAI Error:', error);
    return new Response('Lỗi kết nối OpenAI. Vui lòng thử lại.', { status: 500 });
  }
}
