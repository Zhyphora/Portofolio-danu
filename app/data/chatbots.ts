// chatbots.ts
export const predefinedQuestions = [
  "How can I approach Mr. Naufal?",
  "What are your business hours?",
  "Can you tell me about your services?",
  "Do you offer remote consultations?",
  "What's your refund policy?",
];

// Placeholder for DeepSeek V3 API integration
export const fetchDeepSeekResponse = async (
  question: string
): Promise<string> => {
  // Replace this with actual API call to DeepSeek V3
  const response = await fetch("https://api.deepseek.com/v3/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer YOUR_DEEPSEEK_API_KEY`,
    },
    body: JSON.stringify({ question }),
  });

  const data = await response.json();
  return data.response; // Adjust based on the API response structure
};
