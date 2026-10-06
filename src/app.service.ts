import { Injectable } from '@nestjs/common';
import { prisma } from './database/database';
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getCategories() {
    const result = await prisma.categories.findMany();
    return result;
  }
  async getQuestionsByCategory(categoryId: string) {
    const result = await prisma.questions.findMany({
      where: {
        category_id: Number(categoryId),
      },
    });

    return result;
  }

  async getQuestionsByAnswers() {
    const result = await prisma.questions.findMany({
      select: {
        text: true,
        answers: {
          select: {
            id: true,
            text: true,
          },
        },
      },
    });

    return result;
  }

  async createCategory(name: string) {
    const result = await prisma.categories.create({
      data: { name },
    });

    return result;
  }

  async createQuestions(text: string, category_id: number) {
    const result = await prisma.questions.create({
      data: { text, category_id },
    });
    return result;
  }

  async createAnswers(text: string, is_correct: boolean, question_id: number) {
    const result = await prisma.answers.create({
      data: { text, is_correct, question_id },
    });

    return result;
  }

  async checkAnswer(id: number) {
    const result = await prisma.answers.findUniqueOrThrow({
      where: { id },
      select: { is_correct: true },
    });
    return result;
  }

  async questionsUpdate(id: number, text: string) {
    const result = await prisma.questions.update({
      where: { id },
      data: { text },
    });

    return result;
  }



  async qusetionsDelete(id: string) {
    const numericId = Number(id);
    const [deleteAnswers, deletedQuestion] = await prisma.$transaction([
      prisma.answers.deleteMany({
        where: { question_id: numericId },
      }),
      prisma.questions.delete({
        where: { id: numericId },
      }),
    ]);

    return deletedQuestion;
  }
}
