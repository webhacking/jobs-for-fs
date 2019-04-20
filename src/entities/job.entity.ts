import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

@Entity()
export class JobEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @CreateDateColumn({
    type: 'timestamp',
  })
  public readonly createTime: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  public readonly updateTime: Date;

  @Column({
    length: 60,
    type: 'char',
  })
  public companyName: string;

  @Column({
    length: 30,
    type: 'char',
  })
  public position: string;

  @Column({
    length: 100,
    type: 'char',
  })
  public annualSalary: string;

  @Column({
    length: 150,
    type: 'char',
  })
  public detailURI: string;
}
