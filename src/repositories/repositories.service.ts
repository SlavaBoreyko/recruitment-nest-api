/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { AnswerResponseDto, QuestionResponseDto } from './dto/questions.dto';
const { readFile, writeFile } = require('fs/promises');
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

  async getQuestions(): Promise<QuestionResponseDto[]> {
    const fileContent = await readFile('questions.json', { encoding: 'utf-8' });
    const questions = JSON.parse(fileContent);

    if(!questions.length) {
        console.log('!questions.length')
        // throw new NotFoundException();
        
    }
    return questions;
  }

  async getQuestionById(id: string): Promise<QuestionResponseDto> {
    const questions = await this.getQuestions();
    const question = questions.filter((question) => {
        if (question.id === id) return question;
    })

    if(!question[0]) {
        console.log('!question[0]');
        // throw new NotFoundException();
        
    }
    return question[0];
  }

  async addQuestion(body: AddQuestionParams) {
    const questions = await this.getQuestions();
    const newQuestion = {id: uuid.v4(), ...body, answers: []};
    questions.push(newQuestion)   
    writeFile('questions.json', JSON.stringify(questions), (err) => {
      if (err) console.error(err)
    })

    return newQuestion;
  }

  async getAnswers(id: string): Promise<AnswerResponseDto[]> {
    const question = await this.getQuestionById(id)
    return question.answers;
  }

  async getAnswer(id: string, answerId: string): Promise<AnswerResponseDto> {
    const question = await this.getQuestionById(id);
    const answer = question.answers.filter((answer) => {
        if (answer.id === answerId) return answer;
    })

    if(!answer[0]) {
        console.log('!answer[0]');
        // throw new NotFoundException();
        
    }
    return answer[0];
  }

  async addAnswer(id: string, body: AddAnswerParams) {
    const updateQuestion = await this.getQuestionById(id);
    // const updateAnswers = await this.getAnswers(id);
    const newAnswer = {id: uuid.v4(), ...body};
    updateQuestion.answers.push(newAnswer);
    // updateAnswers.push(newAnswer);

    const questions = await this.getQuestions();
    // remove current question from questions array and then push updateQuestion
    const updateQuestions = questions.filter(question => { return  question.id !== id})
    updateQuestions.push(updateQuestion)  

    // const updateQuestions = questions.find(question => question.id === id).answers = updateAnswers;
    writeFile('questions.json', JSON.stringify(updateQuestions), (err) => {
      if (err) console.error(err)
    })
    return newAnswer;
  }
}
