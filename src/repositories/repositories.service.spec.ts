import { Test, TestingModule } from '@nestjs/testing';
import { FsService } from 'src/fs/fs.service';
import { RepositoriesService } from './repositories.service';
const uuid = require('uuid');

describe('RepositoriesService', () => {
  let service: RepositoriesService;
  let serviceFs: FsService;
  const TEST_QUESTIONS_FILE_PATH = 'test-questions.json';

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RepositoriesService, FsService],
    }).compile();
    service = module.get<RepositoriesService>(RepositoriesService);
    serviceFs = module.get<FsService>(FsService);
    await serviceFs.writeData(
      TEST_QUESTIONS_FILE_PATH,
      JSON.parse(
        JSON.stringify([
          {
            id: '50f9e662-fa0e-4ec7-b53b-7845e8f821c3',
            author: 'John Stockton',
            summary: 'What is the shape of the Earth?',
            answers: [
              {
                id: 'ce7bddfb-0544-4b14-92d8-188b03c41ee4',
                author: 'Brian McKenzie',
                summary: 'The Earth is flat.',
              },
              {
                id: 'd498c0a3-5be2-4354-a3bc-78673aca0f31',
                author: 'Dr Strange',
                summary: 'It is egg-shaped.',
              },
            ],
          },
          {
            id: '00f3dd43-ae53-4430-8da1-b722e034c73d',
            author: 'Sarah Nickle',
            summary: 'Who let the dogs out?',
            answers: [],
          },
        ]),
      ),
    );
    service.setFilePath(TEST_QUESTIONS_FILE_PATH);
  });

  afterAll(async () => {
    await serviceFs.rmFile(TEST_QUESTIONS_FILE_PATH);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getQuestions should return all Questions', async () => {
    const Questions = await service.getQuestions();
    expect(Questions).toEqual([
      {
        id: '50f9e662-fa0e-4ec7-b53b-7845e8f821c3',
        author: 'John Stockton',
        summary: 'What is the shape of the Earth?',
        answers: [
          {
            id: 'ce7bddfb-0544-4b14-92d8-188b03c41ee4',
            author: 'Brian McKenzie',
            summary: 'The Earth is flat.',
          },
          {
            id: 'd498c0a3-5be2-4354-a3bc-78673aca0f31',
            author: 'Dr Strange',
            summary: 'It is egg-shaped.',
          },
        ],
      },
      {
        id: '00f3dd43-ae53-4430-8da1-b722e034c73d',
        author: 'Sarah Nickle',
        summary: 'Who let the dogs out?',
        answers: [],
      },
    ]);
  });

  it('getQuestionById should return certain question', async () => {
    const id = '00f3dd43-ae53-4430-8da1-b722e034c73d';
    const QuestionbyId = await service.getQuestionById(id);
    expect(QuestionbyId).toEqual({
      id: '00f3dd43-ae53-4430-8da1-b722e034c73d',
      author: 'Sarah Nickle',
      summary: 'Who let the dogs out?',
      answers: [],
    });
  });

  it('addQuestion should return new question with id and "answer": []', async () => {
    const body = {
      author: 'Tom',
      summary: "What's going on?",
    };

    const NewQuestion = await service.addQuestion(body);
    expect(NewQuestion).toEqual({
      id: expect.any(String),
      author: 'Tom',
      summary: "What's going on?",
      answers: [],
    });
  });

  it('getAnswers should return certain answers by question id', async () => {
    const id = '50f9e662-fa0e-4ec7-b53b-7845e8f821c3';
    const Answers = await service.getAnswers(id);
    expect(Answers).toEqual([
      {
        id: 'ce7bddfb-0544-4b14-92d8-188b03c41ee4',
        author: 'Brian McKenzie',
        summary: 'The Earth is flat.',
      },
      {
        id: 'd498c0a3-5be2-4354-a3bc-78673aca0f31',
        author: 'Dr Strange',
        summary: 'It is egg-shaped.',
      },
    ]);
  });

  it('getAnswer should return certain answer by its id', async () => {
    const questionId = '50f9e662-fa0e-4ec7-b53b-7845e8f821c3';
    const answerId = 'ce7bddfb-0544-4b14-92d8-188b03c41ee4';
    const Answer = await service.getAnswer(questionId, answerId);
    expect(Answer).toEqual({
      id: 'ce7bddfb-0544-4b14-92d8-188b03c41ee4',
      author: 'Brian McKenzie',
      summary: 'The Earth is flat.',
    });
  });

  it('addAnswer should return new answer with id', async () => {
    const questionId = '00f3dd43-ae53-4430-8da1-b722e034c73d';
    const body = {
      author: 'Miki',
      summary: 'I can help you.',
    };
    const NewAnswer = await service.addAnswer(questionId, body);
    expect(NewAnswer).toEqual({
      id: expect.any(String),
      author: 'Miki',
      summary: 'I can help you.',
    });
  });
});
