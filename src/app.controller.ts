import {Controller, Delete, Get, Param, Post, Put, Body, HttpException} from '@nestjs/common';
import { AppService } from './app.service';
import {Observable} from 'rxjs/index';
import {JobEntity} from './entities/job.entity';
import {CreateParamDto} from './dto/params/create-param.dto';
import {concatMap, map} from 'rxjs/internal/operators';
import {UpdateParamDto} from './dto/params/update-param.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  public getItem(
    @Param('id') id: number,
  ): Observable<JobEntity> {
    return this.appService.getItem(id).pipe(
      map((job) => {
        if (!job) {
          throw new HttpException('Job does not exists.', 400);
        }
        return job;
      }),
    );
  }

  @Get()
  public getItems(
  ): Observable<{
    items: JobEntity[],
    count: number,
  }> {
    return this.appService.getItems();
  }

  @Put(':id')
  public updateItem(
    @Param('id') id: number,
    @Body() body: UpdateParamDto,
  ): Observable<{}> {
    if (!body.companyName || !body.annualSalary || !body.detailURI || !body.position) {
      throw new HttpException('Missing required parameters.', 400);
    }
    return this.appService.getItem(id).pipe(
      concatMap((job) => {
        if (!job) {
          throw new HttpException('Job does not exists.', 400);
        }
        return this.appService.updateItem(job, body);
      }),
      map(() => null),
    );
  }

  @Post()
  public createItem(
    @Body() body: CreateParamDto,
  ): Observable<number> {
    if (!body.companyName || !body.annualSalary || !body.detailURI || !body.position) {
      throw new HttpException('Missing required parameters.', 400);
    }
    return this.appService.createItem(body);
  }

  @Delete(':id')
  public deleteItem(
    @Param('id') id: number,
  ): Observable<{}> {
    return this.appService.getItem(id).pipe(
      concatMap((job) => {
        if (!job) {
          throw new HttpException('Job does not exists.', 400);
        }
        return this.appService.deleteItem(id);
      }),
      map(() => null),
    );
  }
}
