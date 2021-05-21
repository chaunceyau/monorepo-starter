import { PassportSerializer } from '@nestjs/passport';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  private readonly logger = new Logger(SessionSerializer.name);

  serializeUser(user: any, done: (err: Error, user: any) => void): any {
    this.logger.debug(`Serializing user from request ${user}`);
    done(null, user);
  }

  deserializeUser(
    payload: any,
    done: (err: Error, payload: string) => void
  ): any {
    this.logger.debug(`Deserializing payload from request ${payload}`);
    done(null, payload);
  }
}
