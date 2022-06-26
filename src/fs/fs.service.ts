import { BadRequestException, Inject, Injectable } from '@nestjs/common';
const { rm, readFile, writeFile } = require('fs/promises');

@Injectable()
export class FsService {

  async getAllData(filepath: string) {
    const fileContent = await readFile(
      filepath,
      { encoding: 'utf-8' },
      (err) => {
        if (err) {
          throw new BadRequestException();
        }
      },
    );
    const data = JSON.parse(fileContent);
    return data;
  }

  async getDataById(filepath: string, id: string) {
    const fileContent = await readFile(
      filepath,
      { encoding: 'utf-8' },
      (err) => {
        if (err) {
          throw new BadRequestException();
        }
      },
    );
    const data = JSON.parse(fileContent);
    const dataById = data.filter((dataItem) => {
      if (dataItem.id === id) return dataItem;
    });
    return dataById[0];
  }

  async writeData(filepath: string, data: JSON) {
    writeFile(filepath, JSON.stringify(data), (err) => {
      if (err) {
        throw new BadRequestException();
      }
    });
  }

  async rmFile(filepath: string) {
    rm(filepath);
  }
}
