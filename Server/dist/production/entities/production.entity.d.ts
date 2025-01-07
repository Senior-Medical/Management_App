import { Document, Types } from "mongoose";
export declare class Production {
    date: Date;
    quantity: number;
    cost: number;
    product: Types.ObjectId;
    worker: Types.ObjectId;
    department: Types.ObjectId;
    createdAtArabic?: string;
    updatedAtArabic?: string;
    arabicDate?: string;
    createdBy: Types.ObjectId;
    updatedBy: Types.ObjectId;
}
declare const ProductionSchema: import("mongoose").Schema<Production, import("mongoose").Model<Production, any, any, any, Document<unknown, any, Production> & Production & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Production, Document<unknown, {}, import("mongoose").FlatRecord<Production>> & import("mongoose").FlatRecord<Production> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export { ProductionSchema };
export type ProductionDocument = Production & Document<Types.ObjectId>;
