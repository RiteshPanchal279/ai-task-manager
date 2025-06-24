import { db } from '../config/database';
import { taskGenerationHistory } from '../db/schema';
import { GoogleGenerativeAI } from '@google/generative-ai';


export class AIService {
  static async generateTasks(userId: string, topic: string) {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: 'models/gemini-1.5-flash' });

    const prompt = `Generate a list of 5 concise, actionable tasks to learn about ${topic}. Return only the tasks, no numbering or formatting.`;
    
    const result = await model.generateContent(prompt);
    const response =  result.response;
    const text =  response.text();
    
    // Parse the response into individual tasks
    const taskList = text.split('\n').filter(task => task.trim().length > 0).slice(0, 5);
    
    // Save generation history
    await db.insert(taskGenerationHistory).values({
      userId,
      topic,
      generatedTasks: JSON.stringify(taskList),
    });
    
    return { tasks: taskList, topic };
  }
}