import { Injectable } from '@nestjs/common';
import {from, Observable, of} from "rxjs/index";
import {JobEntity} from "./entities/job.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {concatMap, map} from "rxjs/internal/operators";
import {CreateParamDto} from "./dto/params/create-param.dto";
import {UpdateParamDto} from "./dto/params/update-param.dto";
import {DeleteResult} from "typeorm/query-builder/result/DeleteResult";
import {UpdateResult} from "typeorm/query-builder/result/UpdateResult";

@Injectable()
export class AppService {
  public constructor(
    @InjectRepository(JobEntity)
    private readonly jobRepository: Repository<JobEntity>,
  ) {}

  public getItem(id: number): Observable<JobEntity> {
    return from(this.jobRepository.findOne({
      where: {
        id
      }
    }));
  }

  public getItems(): Observable<{
    items: JobEntity[],
    count: number,
  }> {
    return from(this.jobRepository.findAndCount()).pipe(
      map((trans: [JobEntity[], number]) => {
        return {
          count: trans[1],
          items: trans[0]
        }
      })
    )
  }

  public createItem(body: CreateParamDto): Observable<number> {
    return from(this.jobRepository.save(body)).pipe(
      map((job: JobEntity) => job.id)
    )
  }

  public updateItem(job: JobEntity, body: UpdateParamDto): Observable<UpdateResult> {
    return from(this.jobRepository.update(job, body));
  }

  public deleteItem(id: number): Observable<DeleteResult> {
    return from(this.jobRepository.delete(id));
  }
}
