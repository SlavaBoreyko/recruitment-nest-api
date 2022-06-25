/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { FsService } from 'src/fs/fs.service';
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

  async getQuestions(): Promise<QuestionResponseDto[]> {
    const questions = await this.fsService.getAllData('questions.json');

    if(!questions.length) {
        throw new NotFoundException();
    }
    return questions;
  }

  async getQuestionById(id: string): Promise<QuestionResponseDto> {
    const question = await this.fsService.getDataById('questions.json', id);

    if(!question) {
        throw new NotFoundException();
    }
    return question;
  }

  async addQuestion(body: AddQuestionParams) {
    const questions = await this.fsService.getAllData('questions.json');
    const newQuestion = {id: uuid.v4(), ...body, answers: []};
    questions.push(newQuestion)   
    this.fsService.writeData('questions.json', questions);
    return newQuestion;
  }

  async getAnswers(id: string): Promise<AnswerResponseDto[]> {
    const question = await this.fsService.getDataById('questions.json', id);
    return question.answers;
  }

  async getAnswer(id: string, answerId: string): Promise<AnswerResponseDto> {
    const question = await this.fsService.getDataById('questions.json', id);
    const answer = question.answers.filter((answer) => {
        if (answer.id === answerId) return answer;
    })

    if(!answer[0]) {
        throw new NotFoundException();  
    }
    return answer[0];
  }

  async addAnswer(id: string, body: AddAnswerParams) {
    const updateQuestion = await this.fsService.getDataById('questions.json', id);
    const newAnswer = {id: uuid.v4(), ...body};
    updateQuestion.answers.push(newAnswer);

    const questions = await this.fsService.getAllData('questions.json');
    // remove current question from questions array and then push updateQuestion
    const updateQuestions = questions.filter(question => { return  question.id !== id})
    updateQuestions.push(updateQuestion)  
    this.fsService.writeData('questions.json', updateQuestions);
    return newAnswer;
  }
}
