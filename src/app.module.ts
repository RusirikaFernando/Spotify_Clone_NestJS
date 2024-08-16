import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerNoSpecNoFlatModule } from './common/middleware/logger--no-spec--no-flat/logger--no-spec--no-flat.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { SongsController } from './songs/songs.controller';
import { DevConfigService } from './common/providers/DevConfigService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Song } from './songs/songs.entity';

const devConfig = {
  port: 3000
  };
  const proConfig = {
  port: 400
  };


  @Module({
    imports: [
      SongsModule,
      LoggerNoSpecNoFlatModule,
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'root',
        database: 'n-test',
        entities:[Song], // Specify your entities here
        synchronize: true, // Set to false in production
      }),
    ],
    controllers: [AppController],
    providers: [
      AppService,
      {
        provide: DevConfigService,
        useClass: DevConfigService,
      },
      {
        provide: 'CONFIG',
        useFactory: () => {
          return process.env.NODE_ENV === 'development' ? devConfig : proConfig;
        },
      },
    ],
  })
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(SongsController);
  }

  constructor(private dataSource: DataSource) {
    console.log(dataSource.driver.database);
    }
}
