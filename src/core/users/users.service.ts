import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { FindOptionsWhere, Repository, In } from 'typeorm';
import { FindAllUsersDto } from './dto/find-all-users.dto';
import { UserRole } from './enums/user-role.enum';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

  create(createUserDto: CreateUserDto[]) {
    return this.userRepository.save(createUserDto);
  }

  findAll(findOptions?: FindAllUsersDto) {
    const whereOptions: FindOptionsWhere<UserEntity> = findOptions;

    if (findOptions.role) {
      whereOptions.roles = [findOptions.role] as any;
      delete whereOptions['role'];
    }

    return this.userRepository.find({ where: whereOptions, relations: ['group'] });
  }

  findOne(whereOptions: FindOptionsWhere<UserEntity>) {
    return this.userRepository.findOne({ where: whereOptions, relations: ['group'] });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
