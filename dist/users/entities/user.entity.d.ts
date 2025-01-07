import { Document, Types } from 'mongoose';
import { EncryptionService } from 'src/utils/encryption/encryption.service';
import { Role } from '../enums/roles.enum';
export declare class User {
    username: string;
    password: string;
    role?: Role;
    createdAtArabic?: string;
    updatedAtArabic?: string;
    createdBy: Types.ObjectId;
    updatedBy: Types.ObjectId;
}
export declare const createUserSchema: (encryptionService: EncryptionService) => import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, Document<unknown, any, User> & User & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, Document<unknown, {}, import("mongoose").FlatRecord<User>> & import("mongoose").FlatRecord<User> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export type UserDocument = Document<Types.ObjectId> & User;
