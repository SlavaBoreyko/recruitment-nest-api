import { IsNotEmpty, IsString } from 'class-validator';

export class AnswerResponseDto {
  id: string;
  author: string;
  summary: string;
}

export class QuestionResponseDto {
  id: string;
  author: string;
  summary: string;
  answers: AnswerResponseDto[];
}

export class AddQuestionDto {
  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsNotEmpty()
  summary: string;
}

export class addAnswerDto {
  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsNotEmpty()
  summary: string;
}
