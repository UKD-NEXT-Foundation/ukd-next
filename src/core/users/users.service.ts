import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  findAll(whereOptions?: FindOptionsWhere<UserEntity>) {
    return this.userRepository.find({ where: whereOptions, relations: ['group'] });
  }

  findOne(whereOptions: FindOptionsWhere<UserEntity>) {
    return this.userRepository.findOne({ where: whereOptions, relations: ['group', 'group.elder', 'group.curator'] });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
