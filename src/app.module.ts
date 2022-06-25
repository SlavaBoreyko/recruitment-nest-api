import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RepositoriesModule } from './repositories/repositories.module';
import { FsModule } from './fs/fs.module';

@Module({
  imports: [RepositoriesModule, FsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
