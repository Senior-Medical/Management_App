import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { ProductPrice } from "src/product-price/entities/product-price.entity";
import { arabicDateFormatter } from "src/utils/arabic-date-formatter";

@Schema({ timestamps: true })
export class Product {
  @Prop({
    required: true,
    unique: true
  })
  name: string;

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

const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.pre('save', async function (next) {
  if (this.isNew) {
    this.createdAtArabic = arabicDateFormatter.format(new Date());
    this.updatedAtArabic = arabicDateFormatter.format(new Date());
  } else if (this.isModified()) {
    this.updatedAtArabic = arabicDateFormatter.format(new Date());
  }
  next();
});

ProductSchema.post('findOneAndDelete', async function (doc, next) {
  if (doc) {
    await doc.model(ProductPrice.name).deleteMany({ product: doc._id });
  }
  next();
});

export { ProductSchema };

export type ProductDocument = Product & Document<Types.ObjectId>;
