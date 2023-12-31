"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../utils/constants");
const user_entity_1 = require("./entities/user.entity");
const user_repository_1 = require("../user/repo/user.repository");
const user_service_1 = require("../user/user.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(userRepository, jwtService, userService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.userService = userService;
    }
    async create(createUserDto) {
        try {
            const isEmailTaken = await this.userService.findUserByEmail(createUserDto.email);
            if (isEmailTaken) {
                return {
                    message: `User with ${isEmailTaken.email} email is already exist!`,
                };
            }
            let user = new user_entity_1.User();
            user.email = createUserDto.email;
            user.firstName = createUserDto.firstName;
            user.lastName = createUserDto.lastName;
            user.password = createUserDto.password;
            user.role = constants_1.Constants.ROLES.NORMAL_ROLE;
            return await this.userRepository.save(user);
        }
        catch (error) { }
    }
    async login(email, password) {
        try {
            const user = await this.userService.findUserByEmail(email);
            if (!user.enabled) {
                if (!user || !(await this.compareData(password, user.password))) {
                    return { message: "Incorrect email or password" };
                }
                const accessToken = await this.createAccessToken(user);
                return { token: accessToken };
            }
            else {
                return { message: "User is InActive" };
            }
        }
        catch (error) {
            console.log("error is", error);
        }
    }
    compareData(attempt, password) {
        return bcrypt.compare(attempt, password);
    }
    createAccessToken(user) {
        const payload = {
            userId: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
        };
        return this.jwtService.sign(payload);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        jwt_1.JwtService,
        user_service_1.UserService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map