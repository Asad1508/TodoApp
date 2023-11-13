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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const role_guard_1 = require("../auth/guard/role.guard");
const constants_1 = require("../utils/constants");
const swagger_1 = require("@nestjs/swagger");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    findAll(req) {
        return this.userService.findAll();
    }
    remove(id, req) {
        console.log("this is", id);
        return this.userService.remove(+id);
    }
    updateUserStatus(params, body) {
        return this.userService.updateUserStatus(params.id, body.enabled);
    }
};
__decorate([
    (0, swagger_1.ApiSecurity)("JWT-auth"),
    (0, common_1.Get)("/users"),
    (0, common_1.UseGuards)(new role_guard_1.RoleGuard(constants_1.Constants.ROLES.ADMIN_ROLE)),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiSecurity)("JWT-auth"),
    (0, common_1.Delete)(":id"),
    (0, common_1.UseGuards)(new role_guard_1.RoleGuard(constants_1.Constants.ROLES.ADMIN_ROLE)),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "remove", null);
__decorate([
    (0, swagger_1.ApiSecurity)("JWT-auth"),
    (0, common_1.Put)("/:id"),
    (0, common_1.UseGuards)(new role_guard_1.RoleGuard(constants_1.Constants.ROLES.ADMIN_ROLE)),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateUserStatus", null);
UserController = __decorate([
    (0, common_1.Controller)("admin"),
    (0, swagger_1.ApiTags)("User"),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map