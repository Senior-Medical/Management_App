import { Types } from "mongoose";
export declare class CreateProductPriceDto {
    readonly price: number;
    product: Types.ObjectId;
    department: Types.ObjectId;
}
