import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { DatabaseModule } from '@app/src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
