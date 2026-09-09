interface GeminiResponse {
  candidates?: {
    content?: {
      parts?: {
        text?: string;
      }[];
    };
  }[];

  usageMetadata?: {
    promptTokenCount?: number;
    candidatesTokenCount?: number;
    totalTokenCount?: number;
  };
}

export interface InsightData {
  feasibility: {
    status: "viable" | "needs_adjustment" | "unfeasible";
    content: string;
  };

  diagnosis: {
    content: string;
  };

  suggestions: {
    items: string[];
  };

  extraIncome: {
    items: string[];
  };

  investments: {
    items: string[];
  };

  motivation: {
    content: string;
  };
}

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error(
    "VITE_GEMINI_API_KEY não foi encontrada. Verifique o arquivo .env.",
  );
}

const MODEL_NAME = "gemini-3.5-flash-lite";

const GEMINI_API_URL =
  `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`;

/**
 * Schema esperado pela IA.
 */
const insightSchema = {
  type: "object",

  properties: {
    feasibility: {
      type: "object",

      properties: {
        status: {
          type: "string",
          enum: [
            "viable",
            "needs_adjustment",
            "unfeasible",
          ],
        },

        content: {
          type: "string",
        },
      },

      required: ["status", "content"],
    },

    diagnosis: {
      type: "object",

      properties: {
        content: {
          type: "string",
        },
      },

      required: ["content"],
    },

    suggestions: {
      type: "object",

      properties: {
        items: {
          type: "array",

          items: {
            type: "string",
          },
        },
      },

      required: ["items"],
    },

    extraIncome: {
      type: "object",

      properties: {
        items: {
          type: "array",

          items: {
            type: "string",
          },
        },
      },

      required: ["items"],
    },

    investments: {
      type: "object",

      properties: {
        items: {
          type: "array",

          items: {
            type: "string",
          },
        },
      },

      required: ["items"],
    },

    motivation: {
      type: "object",

      properties: {
        content: {
          type: "string",
        },
      },

      required: ["content"],
    },
  },

  required: [
    "feasibility",
    "diagnosis",
    "suggestions",
    "extraIncome",
    "investments",
    "motivation",
  ],
};

const sleep = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

const callGeminiAPI = async (
  prompt: string,
  attempt = 0,
): Promise<GeminiResponse> => {
  const MAX_RETRIES = 3;

  console.log(
    `🚀 Requisição para Gemini - tentativa ${attempt + 1}`,
  );

  const response = await fetch(GEMINI_API_URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],

      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: insightSchema,
      },
    }),
  });

  /**
   * 503 = serviço temporariamente indisponível.
   */
  if (response.status === 503) {
    if (attempt < MAX_RETRIES) {
      const delay = 1000 * Math.pow(2, attempt);

      console.warn(
        `⚠️ Gemini indisponível. Nova tentativa em ${delay}ms.`,
      );

      await sleep(delay);

      return callGeminiAPI(prompt, attempt + 1);
    }

    throw new Error(
      "O serviço de IA está temporariamente indisponível. Tente novamente em alguns instantes.",
    );
  }

  /**
   * 429 = limite de requisições.
   */
  if (response.status === 429) {
    if (attempt < MAX_RETRIES) {
      const delay = 2000 * Math.pow(2, attempt);

      console.warn(
        `⚠️ Limite da API atingido. Nova tentativa em ${delay}ms.`,
      );

      await sleep(delay);

      return callGeminiAPI(prompt, attempt + 1);
    }

    throw new Error(
      "Limite de requisições da IA atingido. Tente novamente mais tarde.",
    );
  }

  /**
   * Outros erros.
   */
  if (!response.ok) {
    let errorMessage = `Erro na requisição: ${response.status}`;

    try {
      const errorData = await response.json();

      console.error(
        "❌ Erro retornado pelo Gemini:",
        errorData,
      );

      if (errorData?.error?.message) {
        errorMessage = errorData.error.message;
      }
    } catch {
      // Ignora caso a resposta não seja JSON.
    }

    throw new Error(errorMessage);
  }

  return (await response.json()) as GeminiResponse;
};

export const getInsight = async (
  prompt: string,
): Promise<InsightData> => {
  const response = await callGeminiAPI(prompt);

  /**
   * Mostra o consumo de tokens no console.
   */
  console.log(
    "📊 Consumo de tokens:",
    response.usageMetadata,
  );

  const text =
    response.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    console.error(
      "❌ Resposta completa do Gemini:",
      response,
    );

    throw new Error(
      "A API não retornou um insight válido.",
    );
  }

  try {
    return JSON.parse(text) as InsightData;
  } catch {
    console.error(
      "❌ JSON inválido recebido do Gemini:",
      text,
    );

    throw new Error(
      "A IA retornou uma resposta em um formato inválido.",
    );
  }
};
