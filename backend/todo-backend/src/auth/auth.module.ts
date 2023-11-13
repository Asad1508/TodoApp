import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategy/jwt.strategy';
// import { LocalStrategy } from './strategy/local.strategy';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/user/repo/user.repository';

@Module({
  imports: [
    PassportModule,
    UserModule,
    TypeOrmModule.forFeature([UserRepository]), 
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_KEY'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRE') + 's', 
        },
      }),
    }),
  ], 
  controllers: [AuthController],
  providers: [ JwtStrategy,AuthService],
  exports:[AuthService]
})
export class AuthModule {}
