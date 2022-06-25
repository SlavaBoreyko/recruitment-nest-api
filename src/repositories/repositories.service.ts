/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { AddQuestionDto } from './dto/questions.dto';
const { readFile, writeFile } = require('fs/promises');

@Injectable()
export class RepositoriesService {

  async getQuestions() {
    const fileContent = await readFile('questions.json', { encoding: 'utf-8' });
    const questions = JSON.parse(fileContent);
    return questions;
  }

  async getQuestionById(id: string) {
    const questions = await this.getQuestions();
    const question = questions.filter((question) => {
        if (question.id === id) return question;
    })
    return question[0];
  }

  async addQuestion(body: AddQuestionDto) {

    // json.push({address})    
    // fs.writeFile('address-list.json', JSON.stringify(json), (err) => {
    //   if (err) reject(err)
    //   resolve("File saved.")
    // })
  }

  async getAnswers(id: string) {
    const question = await this.getQuestionById(id)
    return question.answers;
  }

  async getAnswer(id: string, answerId: string) {
    const question = await this.getQuestionById(id)
    const answer = question.answers.filter((answer) => {
        if (answer.id === answerId) return answer;
    })
    return answer[0];
  }
}
