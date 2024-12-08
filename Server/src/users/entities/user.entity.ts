import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Role } from '../enums/roles.enum';
import { EncryptionService } from 'src/utils/encryption/encryption.service';

@Schema({timestamps: true})
export class User {
  @Prop({
    required: true,
    unique: true,
    index: true
  })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    enum: Role,
    default: Role.STAFF
  })
  role: Role;

  @Prop({ default: new Date() })
  changePasswordAt?: Date;
}

export const createUserSchema = (encryptionService: EncryptionService) => {
  const UserSchema = SchemaFactory.createForClass(User);

  UserSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
      this.password = await encryptionService.bcryptHash(this.password);
      this.changePasswordAt = new Date();
      next();
    }
  })

  return UserSchema;
}

export type UserDocument = Document<Types.ObjectId> & User;
