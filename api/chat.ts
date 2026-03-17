// api/chat.ts (tương tự, nhưng hỗ trợ messages array cho chat history)
import OpenAI from 'openai';

export default async function handler(req: Request) {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 });

  const { messages, context } = await req.json();  // messages là array [{role, content}]
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) return new Response('API Key not configured', { status: 500 });

  try {
    const openai = new OpenAI({ apiKey });
    const systemPrompt = `Bạn là trợ lý Thần Số Học AI. Sử dụng context: ${context}. Trả lời bằng tiếng Việt, hữu ích và dựa trên chỉ số.`;
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ],
      temperature: 0.5,
      max_tokens: 1500,
    });
    return new Response(JSON.stringify({ text: completion.choices[0].message.content }), { status: 200 });
  } catch (error) {
    console.error('OpenAI Error:', error);
    return new Response('Lỗi kết nối OpenAI. Vui lòng thử lại.', { status: 500 });
  }
}
