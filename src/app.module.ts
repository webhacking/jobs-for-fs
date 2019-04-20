import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {JobEntity} from "./entities/job.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'fastcampus.ccop87p4o0qr.ap-northeast-1.rds.amazonaws.com',
      port: 3306,
      username: 'fastcampus',
      password: 'pass-for-fastcampus',
      database: 'fastcampus',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([
      JobEntity
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
