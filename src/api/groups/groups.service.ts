import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupEntity } from './entities/group.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(GroupEntity)
    private readonly groupRepository: Repository<GroupEntity>,
  ) {}

  create(payload: CreateGroupDto | CreateGroupDto[]) {
    return this.groupRepository.save(Array.isArray(payload) ? payload : [payload]);
  }

  findAll() {
    return this.groupRepository.find({ relations: ['students'] });
  }

  findOne(id: number) {
    return this.groupRepository.findOneBy({ id });
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return this.groupRepository.update(id, updateGroupDto);
  }

  remove(id: number) {
    return this.groupRepository.delete(id);
  }
}
