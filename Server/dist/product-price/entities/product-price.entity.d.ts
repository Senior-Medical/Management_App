import { Document, Types } from "mongoose";
export declare class ProductPrice {
    price: number;
    product: Types.ObjectId;
    department: Types.ObjectId;
    createdAtArabic?: string;
    updatedAtArabic?: string;
    createdBy: Types.ObjectId;
    updatedBy: Types.ObjectId;
}
declare const ProductPriceSchema: import("mongoose").Schema<ProductPrice, import("mongoose").Model<ProductPrice, any, any, any, Document<unknown, any, ProductPrice> & ProductPrice & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ProductPrice, Document<unknown, {}, import("mongoose").FlatRecord<ProductPrice>> & import("mongoose").FlatRecord<ProductPrice> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export { ProductPriceSchema };
export type ProductPriceDocument = ProductPrice & Document<Types.ObjectId>;
