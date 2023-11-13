import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../../auth/entities/user.entity';

@EntityRepository(User)
@Injectable()
export class UserRepository extends Repository<User> {}
