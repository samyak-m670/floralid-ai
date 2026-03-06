import { GoogleGenAI, Type } from "@google/genai";

// Initialize with a dummy key if none exists to prevent crashing the entire UI on load.
// The real error will be caught when trying to actually identify a plant.
const apiKey = process.env.GEMINI_API_KEY || "missing_api_key_placeholder";
const ai = new GoogleGenAI({ apiKey });

export interface PlantInfo {
  name: string;
  scientificName: string;
  family: string;
  description: string;
  careTips: {
    watering: string;
    sunlight: string;
    soil: string;
    temperature: string;
    humidity: string;
  };
  funFact: string;
}

export async function identifyPlant(base64Image: string): Promise<PlantInfo> {
  const model = "gemini-3-flash-preview";
  
  const response = await ai.models.generateContent({
    model,
    contents: [
      {
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: base64Image,
            },
          },
          {
            text: "Identify this plant and provide detailed information including its common name, scientific name, family, a brief description, and specific care tips (watering, sunlight, soil, temperature, humidity). Also include one interesting fun fact. Return the result in JSON format.",
          },
        ],
      },
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          scientificName: { type: Type.STRING },
          family: { type: Type.STRING },
          description: { type: Type.STRING },
          careTips: {
            type: Type.OBJECT,
            properties: {
              watering: { type: Type.STRING },
              sunlight: { type: Type.STRING },
              soil: { type: Type.STRING },
              temperature: { type: Type.STRING },
              humidity: { type: Type.STRING },
            },
            required: ["watering", "sunlight", "soil", "temperature", "humidity"],
          },
          funFact: { type: Type.STRING },
        },
        required: ["name", "scientificName", "family", "description", "careTips", "funFact"],
      },
    },
  });

  const text = response.text;
  if (!text) throw new Error("No response from AI");
  return JSON.parse(text) as PlantInfo;
}
