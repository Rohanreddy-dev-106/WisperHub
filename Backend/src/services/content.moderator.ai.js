import axios from "axios";

export async function checkIfHarmful(content) {
    const prompt = `
You are a content moderation system.

Analyze the content below and decide whether it is harmful.
Harmful includes:
- Hate speech
- Harassment
- Threats
- Sexual content
- Violence
- Illegal activities

Respond ONLY in valid JSON format:
{
  "harmful": true | false
}

Content:
"${content}"
`;

    const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            temperature: 0
        },
        {
            headers: {
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
            }
        }
    );

    const aiReply = response.data.choices[0].message.content;

    // Safely parse JSON
    return JSON.parse(aiReply);
}