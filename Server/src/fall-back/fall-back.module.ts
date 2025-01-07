import { Module } from "@nestjs/common";
import { FallBackController } from "./fall-back.controller";

@Module({
  controllers: [FallBackController]
})
export class FallBackModule {}