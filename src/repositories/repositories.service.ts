/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { FsService } from 'src/fs/fs.service';
// import { MiddlewareOptions } from 'src/middleware/dto/middleware.dto';
import { AnswerResponseDto, QuestionResponseDto } from './dto/questions.dto';
const uuid = require('uuid');

interface AddQuestionParams {
    author: string;
    summary: string;
}

interface AddAnswerParams {
    author: string;
    summary: string;
}

@Injectable()
export class RepositoriesService {
  constructor(private readonly fsService: FsService) {}
  private filepath: string;

  async setFilePath(filepath: string) {
    this.filepath = filepath;
  }

  async getQuestions(): Promise<QuestionResponseDto[]> {
    const questions = await this.fsService.getAllData(this.filepath);
    if(!questions.length) {
        throw new NotFoundException();
    }
    return questions;
  }

  async getQuestionById(id: string): Promise<QuestionResponseDto> {
    const question = await this.fsService.getDataById(this.filepath, id);

    if(!question) {
        throw new NotFoundException();
    }
    return question;
  }

  async addQuestion(body: AddQuestionParams) {
    const questions = await this.fsService.getAllData(this.filepath);
    const newQuestion = {id: uuid.v4(), ...body, answers: []};
    questions.push(newQuestion)   
    this.fsService.writeData(this.filepath, questions);
    return newQuestion;
  }

  async getAnswers(id: string): Promise<AnswerResponseDto[]> {
    const question = await this.fsService.getDataById(this.filepath, id);
    return question.answers;
  }

  async getAnswer(id: string, answerId: string): Promise<AnswerResponseDto> {
    const question = await this.fsService.getDataById(this.filepath, id);
    const answer = question.answers.filter((answer) => {
        if (answer.id === answerId) return answer;
    })

    if(!answer[0]) {
        throw new NotFoundException();  
    }
    return answer[0];
  }

  async addAnswer(id: string, body: AddAnswerParams) {
    const updateQuestion = await this.fsService.getDataById(this.filepath, id);
    const newAnswer = {id: uuid.v4(), ...body};
    updateQuestion.answers.push(newAnswer);

    const questions = await this.fsService.getAllData(this.filepath);
    // remove current question from questions array and then push updateQuestion
    const updateQuestions = questions.filter(question => { return  question.id !== id})
    updateQuestions.push(updateQuestion)  
    this.fsService.writeData(this.filepath, updateQuestions);
    return newAnswer;
  }
}
