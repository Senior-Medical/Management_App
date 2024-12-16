import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Role } from '../enums/roles.enum';
import { EncryptionService } from 'src/utils/encryption/encryption.service';
import { arabicDateFormater } from 'src/utils/arabic-date-formater';

@Schema({ timestamps: true })
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
  role?: Role;

  @Prop()
  createdAtArabic?: string;

  @Prop()
  updatedAtArabic?: string;

  @Prop({
    required: true,
    ref: 'User'
  })
  createdBy: Types.ObjectId;

  @Prop({
    required: true,
    ref: 'User'
  })
  updatedBy: Types.ObjectId;
}

export const createUserSchema = (encryptionService: EncryptionService) => {
  const UserSchema = SchemaFactory.createForClass(User);

  UserSchema.pre('save', async function (next) {
    if (this.isNew) {
      this.createdAtArabic = arabicDateFormater.format(new Date());
      this.updatedAtArabic = arabicDateFormater.format(new Date());
    }else if (this.isModified()) {
      this.updatedAtArabic = arabicDateFormater.format(new Date());
    }
    if (this.isModified('password')) {
      this.password = await encryptionService.bcryptHash(this.password);
      next();
    }
  })

  return UserSchema;
}

export type UserDocument = Document<Types.ObjectId> & User;
