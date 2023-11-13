import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Constants } from "src/utils/constants";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";
import { UserRepository } from "../user/repo/user.repository";
import { UserService } from "src/user/user.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private userService: UserService
  ) {}

  public async create(createUserDto: CreateUserDto) {
    try {
      const isEmailTaken = await this.userService.findUserByEmail(
        createUserDto.email
      );

      if (isEmailTaken) {
        return {
          message: `User with ${isEmailTaken.email} email is already exist!`,
        };
      }

      let user: User = new User();

      user.email = createUserDto.email;
      user.firstName = createUserDto.firstName;
      user.lastName = createUserDto.lastName;
      user.password = createUserDto.password;
      user.role = Constants.ROLES.NORMAL_ROLE;

      return await this.userRepository.save(user);
    } catch (error) {}
  }
  public async login(email, password): Promise<any> {
    try {
      const user = await this.userService.findUserByEmail(email);

      if (!user.enabled) {
        if (!user || !(await this.compareData(password, user.password))) {
          return { message: "Incorrect email or password" };
        }

        const accessToken = await this.createAccessToken(user);

        return { token: accessToken };
      } else {
        return { message: "User is InActive" };
      }
    } catch (error) {
      console.log("error is", error);
    }
  }

  public compareData(attempt: string, password: string) {
    return bcrypt.compare(attempt, password);
  }

  public createAccessToken(user) {
    const payload = {
      userId: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    };

    return this.jwtService.sign(payload);
  }
}
