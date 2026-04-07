module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt, system, model } = req.body;
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'GROQ_API_KEY is not configured in Vercel' });
  }

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: model || 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: system || '' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.8,
        max_tokens: 800
      })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error?.message || 'Error from Groq API');
    }

    res.status(200).json({ text: data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
