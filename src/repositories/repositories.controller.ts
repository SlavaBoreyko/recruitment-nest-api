import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { addAnswerDto, AddQuestionDto } from './dto/questions.dto';
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
  async addQuestion(@Body() body: AddQuestionDto) {
    return this.repositoriesService.addQuestion(body);
  }

  @Get('/:questionId/answers')
  getAnswers(@Param('questionId') questionId: string) {
    return this.repositoriesService.getAnswers(questionId);
  }

  @Post('/:questionId/answers')
  async addAnswer(
    @Param('questionId') questionId: string,
    @Body() body: addAnswerDto,
  ) {
    return this.repositoriesService.addAnswer(questionId, body);
  }

  @Get('/:questionId/answers/:answerId')
  getAnswer(
    @Param('questionId') questionId: string,
    @Param('answerId') answerId: string,
  ) {
    return this.repositoriesService.getAnswer(questionId, answerId);
  }
}
