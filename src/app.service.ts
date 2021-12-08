import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {message: 'Test application for typeORM purposes'};
  }
}
