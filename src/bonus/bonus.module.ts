import { Module } from '@nestjs/common';
import { BonusService } from './bonus.service';
import { BonusController } from './bonus.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Bonus, BonusSchema } from './entities/bonus.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Bonus.name,
        schema: BonusSchema
      }
    ]),
    UsersModule
  ],
  controllers: [BonusController],
  providers: [BonusService],
  exports: [BonusService]
})
export class BonusModule {}
