import { Injectable, mixin, NestMiddleware, Type } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RepositoriesService } from 'src/repositories/repositories.service';
import { MiddlewareOptions } from './dto/middleware.dto';

export function MiddlewareCreator(
  options: MiddlewareOptions,
): Type<NestMiddleware> {
  @Injectable()
  class ReposietoriesMiddleware implements NestMiddleware {
    constructor(private readonly repositoriesService: RepositoriesService) {}
    use(req: Request, res: Response, next: NextFunction) {
      this.repositoriesService.setFilePath(options.storageFilePath);
      next();
    }
  }
  return mixin(ReposietoriesMiddleware);
}
