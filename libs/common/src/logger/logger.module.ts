import { Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    PinoLoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            translateTime: 'HH:mm:ss Z',
            singleLine: true,
          },
        },
      },
    }),
  ],
})
export class LoggerModule {}
