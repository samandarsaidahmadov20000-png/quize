import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('categories')
  getCategories() {
    return this.appService.getCategories();
  }

  @Get('questions/:categoryId')
  getQuestions(@Param('categoryId') categoryId: string) {
    return this.appService.getQuestionsByCategory(categoryId);
  }

  @Get('answers')
  getAnswers() {
    return this.appService.getQuestionsByAnswers();
  }

  @Post('categories')
  createCategory(@Body() body: any) {
    return this.appService.createCategory(body.name);
  }

  @Post('questions/:categoryId')
  createQuestions(@Param('categoryId') categoryId: number, @Body() body: any) {
    return this.appService.createQuestions(body.text, Number(categoryId));
  }

  @Post('answers/:questionId')
  createAnswers(@Param('questionId') questionId: number, @Body() body: any) {
    return this.appService.createAnswers(
      body.text,
      body.is_correct,
      questionId,
    );
  }

  @Post('answerscheck/:id')
  checkAnswer(@Param('id') id: number) {
    return this.appService.checkAnswer(id);
  }

  @Put('questions/:id')
  questionsUpdate(@Param('id') id: number, @Body() body: any) {
    return this.appService.questionsUpdate(id, body.text);
  }

  @Delete('questions/:id')
  qusetionsDelete(@Param('id') id: string) {
    return this.appService.qusetionsDelete(id);
  }
}
