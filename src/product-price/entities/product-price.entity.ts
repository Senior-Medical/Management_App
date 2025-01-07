import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { arabicDateFormatter } from "src/utils/arabic-date-formatter";

@Schema({ timestamps: true })
export class ProductPrice {
  @Prop({
    required: true,
  })
  price: number;

  @Prop({
    required: true,
    ref: 'Product',
  })
  product: Types.ObjectId;

  @Prop({
    required: true,
    ref: 'Department',
  })
  department: Types.ObjectId;

  @Prop()
  createdAtArabic?: string;

  @Prop()
  updatedAtArabic?: string;

  @Prop({
    required: true,
    ref: 'User',
  })
  createdBy: Types.ObjectId;

  @Prop({
    required: true,
    ref: 'User',
  })
  updatedBy: Types.ObjectId;
}

const ProductPriceSchema = SchemaFactory.createForClass(ProductPrice);
ProductPriceSchema.index({ product: 1, department: 1 }, { unique: true });
ProductPriceSchema.pre('save', async function (next) {
  if (this.isNew) {
    this.createdAtArabic = arabicDateFormatter.format(new Date());
    this.updatedAtArabic = arabicDateFormatter.format(new Date());
  } else if (this.isModified()) {
    this.updatedAtArabic = arabicDateFormatter.format(new Date());
  }
  next();
});

export { ProductPriceSchema };

export type ProductPriceDocument = ProductPrice & Document<Types.ObjectId>;