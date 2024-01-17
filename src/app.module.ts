import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgres://ukd-next:UzR2Pm3kmMaZezmTZuhE5CNkoH88z4zC@database.dmytroframe.com/ukd-next',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    CoreModule,
  ],
})
export class AppModule {}
