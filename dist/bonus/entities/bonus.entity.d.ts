import { Document, Types } from "mongoose";
export declare class Bonus {
    from: number;
    to: number;
    percentage: number;
    createdAtArabic?: string;
    updatedAtArabic?: string;
    createdBy: Types.ObjectId;
    updatedBy: Types.ObjectId;
}
declare const BonusSchema: import("mongoose").Schema<Bonus, import("mongoose").Model<Bonus, any, any, any, Document<unknown, any, Bonus> & Bonus & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Bonus, Document<unknown, {}, import("mongoose").FlatRecord<Bonus>> & import("mongoose").FlatRecord<Bonus> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export { BonusSchema };
export type BonusDocument = Bonus & Document<Types.ObjectId>;
