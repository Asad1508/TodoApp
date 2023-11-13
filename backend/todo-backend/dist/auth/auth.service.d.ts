import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";
import { UserRepository } from "../user/repo/user.repository";
import { UserService } from "src/user/user.service";
import { JwtService } from "@nestjs/jwt";
export declare class AuthService {
    private userRepository;
    private jwtService;
    private userService;
    constructor(userRepository: UserRepository, jwtService: JwtService, userService: UserService);
    create(createUserDto: CreateUserDto): Promise<User | {
        message: string;
    }>;
    login(email: any, password: any): Promise<any>;
    compareData(attempt: string, password: string): any;
    createAccessToken(user: any): string;
}
