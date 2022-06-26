import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RepositoriesModule } from './repositories/repositories.module';
import { FsModule } from './fs/fs.module';
import { MiddlewareCreator } from './middleware/repositories.middleware';
import { RepositoriesController } from './repositories/repositories.controller';

const options = {
  storageFilePath: 'questions.json',
};

@Module({
  imports: [RepositoriesModule, FsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MiddlewareCreator(options))
      .forRoutes(RepositoriesController);
  }
}
