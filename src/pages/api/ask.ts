import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { question, data } = req.body;
  const sample = data ? JSON.stringify(data) : "";

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    // stream: true,
    messages: [
      {
        role: "user",
        content: `Given this data:\n${sample}\nAnswer this question: ${question}`,
      },
    ],
  });

  res.status(200).json({ answer: response.choices[0].message.content });
}
