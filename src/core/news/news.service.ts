import { Injectable } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { NewsEntity } from './entities/news.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(NewsEntity)
    private readonly newsRepository: Repository<NewsEntity>
  ) {}

  create(createNewsDto: CreateNewsDto) {
    return this.newsRepository.save(createNewsDto);
  }

  findAll() {
    return this.newsRepository.find({ relations: ['author'], order: { createdAt: 'DESC' } });
  }

  findOne(id: string) {
    return this.newsRepository.findOne({ relations: ['author'], where: { id } });
  }

  update(id: string, updateNewsDto: UpdateNewsDto) {
    return this.newsRepository.update(id, updateNewsDto);
  }

  remove(id: string) {
    return this.newsRepository.delete(id);
  }
}
