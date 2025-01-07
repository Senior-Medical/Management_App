import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { createUserSchema, User } from './entities/user.entity';
import { EncryptionModule } from 'src/utils/encryption/encryption.module';
import { EncryptionService } from 'src/utils/encryption/encryption.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        imports: [EncryptionModule],
        name: User.name,
        useFactory: async (encryptionService: EncryptionService) => createUserSchema(encryptionService),
        inject: [EncryptionService]
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule { }