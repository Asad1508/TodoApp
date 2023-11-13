import { CanActivate, ExecutionContext } from '@nestjs/common/interfaces';
export declare class RoleGuard implements CanActivate {
    private role;
    constructor(role: string);
    canActivate(context: ExecutionContext): boolean;
}
