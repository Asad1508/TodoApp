"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleGuard = void 0;
class RoleGuard {
    constructor(role) {
        this.role = role;
    }
    canActivate(context) {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest();
        if (this.role == request.user.role)
            return true;
        return false;
    }
}
exports.RoleGuard = RoleGuard;
//# sourceMappingURL=role.guard.js.map