import { Logger } from '@nestjs/common';

export class CustomLogger extends Logger {
  error(message: string, trace: string) {
    // add your tailored logic here
    super.error(message, trace);
  }
}
