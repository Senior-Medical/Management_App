import { Document, Types } from "mongoose";
export declare class Department {
    name: string;
    createdAtArabic?: string;
    updatedAtArabic?: string;
    createdBy: Types.ObjectId;
    updatedBy: Types.ObjectId;
}
declare const DepartmentSchema: import("mongoose").Schema<Department, import("mongoose").Model<Department, any, any, any, Document<unknown, any, Department> & Department & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Department, Document<unknown, {}, import("mongoose").FlatRecord<Department>> & import("mongoose").FlatRecord<Department> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export { DepartmentSchema };
export type DepartmentDocument = Department & Document<Types.ObjectId>;
