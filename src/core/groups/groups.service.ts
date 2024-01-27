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
    private readonly groupRepository: Repository<GroupEntity>
  ) {}

  create(createGroupDto: CreateGroupDto) {
    return this.groupRepository.save(createGroupDto);
  }

  findAll() {
    return this.groupRepository.find({ relations: ['students'] });
  }

  findOne(id: string) {
    return this.groupRepository.findOneBy({ id });
  }

  update(id: string, updateGroupDto: UpdateGroupDto) {
    return this.groupRepository.update(id, updateGroupDto);
  }

  remove(id: string) {
    return this.groupRepository.delete(id);
  }
}
