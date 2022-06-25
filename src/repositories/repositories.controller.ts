import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AddQuestionDto } from './dto/questions.dto';
import { RepositoriesService } from './repositories.service';

@Controller('questions')
export class RepositoriesController {
  constructor(private readonly repositoriesService: RepositoriesService) {}

  @Get()
  getQuestions() {
    return this.repositoriesService.getQuestions();
  }

  @Get('/:questionId')
  getQuestion(@Param('questionId') questionId: string) {
    return this.repositoriesService.getQuestionById(questionId);
  }

  @Post()
  addQuestion(@Body() body: AddQuestionDto) {
    return this.repositoriesService.addQuestion(body);
  };

  @Get('/:questionId/answers')
  async getAnswers(@Param('questionId') questionId: string) {
    return this.repositoriesService.getAnswers(questionId);
  }

  @Get('/:questionId/answers/:answerId')
  async getAnswer(
    @Param('questionId') questionId: string,
    @Param('answerId') answerId: string,
  ) {
    return this.repositoriesService.getAnswer(questionId, answerId);
  }
}
