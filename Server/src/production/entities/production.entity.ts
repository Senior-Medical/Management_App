import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { arabicDateFormatter } from "src/utils/arabic-date-formatter";

@Schema({ timestamps: true })
export class Production {
  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  cost: number;

  @Prop({
    required: true,
    ref: 'Product'
  })
  product: Types.ObjectId;

  @Prop({
    required: true,
    ref: 'Worker'
  })
  worker: Types.ObjectId;
  
  @Prop({
    required: true,
    ref: 'Department'
  })
  department: Types.ObjectId;

  @Prop()
  createdAtArabic?: string;

  @Prop()
  updatedAtArabic?: string;

  @Prop()
  arabicDate?: string;

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

const ProductionSchema = SchemaFactory.createForClass(Production);
ProductionSchema.pre('save', async function (next) {
  if (this.isNew) {
    this.createdAtArabic = arabicDateFormatter.format(new Date());
    this.updatedAtArabic = arabicDateFormatter.format(new Date());
  } else if (this.isModified()) {
    this.updatedAtArabic = arabicDateFormatter.format(new Date());
  }
  if (this.isModified('date')) {
    this.arabicDate = arabicDateFormatter.format(this.date);
  }
  next();
});

export { ProductionSchema };

export type ProductionDocument = Production & Document<Types.ObjectId>;