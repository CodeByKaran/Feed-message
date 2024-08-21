import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export async function POST() {
  // Define the prompt directly in the function
  const prompt = "Generate an anonymous message that is positive, neutral, or informative. Avoid personal, offensive, or controversial content. The message should focus on general life advice, interesting facts, or encouraging words.";

  // Generate the streaming response using the provided prompt
  const { textStream } = await streamText({
    model: openai('gpt-3.5-turbo'), // Initialize with the GPT-4 Turbo model
    prompt: prompt,               // Pass the prompt
  });

  // Output the text stream
  const messageParts = [];
  for await (const textPart of textStream) {
    messageParts.push(textPart);
    process.stdout.write(textPart); // This writes the output to the console (for debugging or logs)
  }

  // Combine the parts into a full message
  const fullMessage = messageParts.join('');

  return new Response(
    JSON.stringify({ success: true, message: fullMessage }),
    { headers: { 'Content-Type': 'application/json' } }
  );
}
