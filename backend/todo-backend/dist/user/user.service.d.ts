import { UserRepository } from "./repo/user.repository";
export declare class UserService {
    private userRepository;
    constructor(userRepository: UserRepository);
    findUserById(id: number): Promise<import("../auth/entities/user.entity").User>;
    findAll(): Promise<import("../auth/entities/user.entity").User[] | {
        message: any;
    }>;
    findUserByEmail(email: string): Promise<import("../auth/entities/user.entity").User>;
    remove(id: number): Promise<{
        response: import("typeorm").DeleteResult;
        message: string;
    } | {
        message: any;
        response?: undefined;
    }>;
    updateUserStatus(userId: number, enabled: boolean): Promise<import("../auth/entities/user.entity").User | {
        message: any;
    }>;
}
