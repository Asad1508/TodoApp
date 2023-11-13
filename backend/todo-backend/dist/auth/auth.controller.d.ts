import { JwtService } from "@nestjs/jwt";
import { User } from "src/auth/entities/user.entity";
import { LoginDto } from "./dto/login.dto";
import { CreateUserDto } from "src/auth/dto/create-user.dto";
import { AuthService } from "./auth.service";
export declare class AuthController {
    private jwtService;
    private readonly authService;
    constructor(jwtService: JwtService, authService: AuthService);
    create(createUserDto: CreateUserDto): Promise<User | {
        message: string;
    }>;
    login(loginDto: LoginDto): Promise<any> | {
        message: string;
    };
}
