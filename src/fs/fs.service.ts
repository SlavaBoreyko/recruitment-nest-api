import { BadRequestException, Injectable } from '@nestjs/common';
const { readFile, writeFile } = require('fs/promises');

@Injectable()
export class FsService {
  async getAllData(filename: string) {
    const fileContent = await readFile(
      filename,
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

  async getDataById(filename: string, id: string) {
    const fileContent = await readFile(
      filename,
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

  async writeData(filename: string, data: JSON) {
    writeFile(filename, JSON.stringify(data), (err) => {
      if (err) {
        throw new BadRequestException();
      }
    });
  }
}
