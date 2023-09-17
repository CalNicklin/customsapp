import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: import.meta.env.VITE_OPENAI_API_KEY, dangerouslyAllowBrowser: true });

const generateInfo = async (string: string) => {

  const prompt = 'You are a HS code generator. I will ask you to find the HS code for a given string. Please reply with only the HS code itself. For example, if the HS code is 6203.42, your reply will be strictly 620342 with absolutely no other text. I want numbers only. The first item is: '

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: `${prompt}The search string is: ${string}` }],
      max_tokens: 200,
      temperature: 1,
      n: 1,
    });
    const response = completion.choices[0].message.content;
    const formattedResponse = response?.replace('.', '')
    return formattedResponse

  } catch (error) {
    console.log(error);
  }
};

const summariseInfo = async (string: string) => {
  if (string.length < 200) return string
  
  const prompt = `You are summarising this text. I will ask you to summarise a given text. Please reply with only the summary itself. For example, if the summary is "This is a summary", your reply will be strictly "This is a summary" with absolutely no other text. I want text only. The first item is: ${string}`

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: `${prompt}${string}` }],
      max_tokens: 200,
      temperature: 1,
      n: 1,
    });
    const response = completion.choices[0].message.content;
    return response

  } catch (error) {
    console.log(error);
  }
}

export { generateInfo, summariseInfo }