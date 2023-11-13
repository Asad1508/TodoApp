import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags } from "@nestjs/swagger";
import { User } from "src/auth/entities/user.entity";
import { LoginDto } from "./dto/login.dto";
import { CreateUserDto } from "src/auth/dto/create-user.dto";
import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service";

@Controller("auth")
// @ApiTags('Login')
export class AuthController {
  constructor(
    private jwtService: JwtService,
    private readonly authService: AuthService
  ) {}

  @Post("/signUp")
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.authService.create({ ...createUserDto });
  }

  @Post("/login")
  login(@Body() loginDto: LoginDto) {
    console.log(loginDto);
    
    const { email, password } = loginDto;

    if (!email || !password) {
      return { message: "Please provide email and password!" };
    }
    return this.authService.login(email, password);
  }
}
