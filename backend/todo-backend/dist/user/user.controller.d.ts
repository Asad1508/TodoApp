import { UserService } from "./user.service";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(req: any): Promise<import("../auth/entities/user.entity").User[] | {
        message: any;
    }>;
    remove(id: string, req: any): Promise<{
        response: import("typeorm").DeleteResult;
        message: string;
    } | {
        message: any;
        response?: undefined;
    }>;
    updateUserStatus(params: any, body: any): Promise<import("../auth/entities/user.entity").User | {
        message: any;
    }>;
}
