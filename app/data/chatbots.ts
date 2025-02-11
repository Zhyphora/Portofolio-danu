// chatbots.ts

// Define the type for predefinedQuestions
interface Question {
  question: string;
  answer: string;
}

export const predefinedQuestions: Question[] = [
  {
    question: "How can I approach Mr. Naufal?",
    answer:
      "You can contact Mr. Naufal by email at naufalsyarif.work@gmail.com",
  },
  {
    question: "What are your business hours?",
    answer:
      "Our business hours are Monday to Friday, 9 AM to 5 PM. We are closed on weekends and public holidays.",
  },
  {
    question: "Can you tell me about your services?",
    answer:
      "We offer a wide range of services including consulting, project management, and software development.",
  },
  {
    question: "Do you offer remote consultations?",
    answer:
      "Yes, we offer remote consultations via video conferencing. You can book email naufalsyarif.work@gmail.com for further conversations.",
  },
  {
    question: "What's your refund policy?",
    answer:
      "Our refund policy allows for full refunds within 14 days of purchase, provided the service has not been used. Please refer to our terms of service for more details.",
  },
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
