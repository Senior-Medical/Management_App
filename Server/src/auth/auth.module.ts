import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { UsersModule } from "src/users/users.module";
import { EncryptionModule } from "src/utils/encryption/encryption.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./local.strategy";
import { SessionSerializer } from "./session.serializer";
import { LoggerModule } from "src/utils/logger/logger.module";

@Module({
  imports: [
    PassportModule.register({ session: true }),
    LoggerModule,
    EncryptionModule,
    UsersModule
  ],
  providers: [
    AuthService,
    LocalStrategy,
    SessionSerializer
  ],
  controllers: [AuthController]
})
export class AuthModule { }