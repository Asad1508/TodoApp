import { Todo } from "src/todo/entities/todo.entity";
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import * as bcrypt from "bcrypt";
import { IsBoolean, IsOptional } from "class-validator";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @Column({ nullable: true, default: false })
  @IsBoolean()
  enabled: boolean;

  // one user can have multipe todos
  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 12);
    }
  }
}
