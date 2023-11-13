import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  Req,
  UseGuards,
  Put,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { RoleGuard } from "src/auth/guard/role.guard";
import { Constants } from "src/utils/constants";
import { ApiSecurity, ApiTags } from "@nestjs/swagger";

@Controller("admin")
@ApiTags("User")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiSecurity("JWT-auth")
  @Get("/users")
  @UseGuards(new RoleGuard(Constants.ROLES.ADMIN_ROLE))
  findAll(@Req() req) {
    return this.userService.findAll();
  }

  @ApiSecurity("JWT-auth")
  @Delete(":id")
  @UseGuards(new RoleGuard(Constants.ROLES.ADMIN_ROLE))
  remove(@Param("id") id: string, @Req() req) {
    console.log("this is",id);
    
    return this.userService.remove(+id);
  }

  @ApiSecurity("JWT-auth")
  @Put("/:id")
  @UseGuards(new RoleGuard(Constants.ROLES.ADMIN_ROLE))
  updateUserStatus(@Param() params, @Body() body) {
    return this.userService.updateUserStatus(params.id, body.enabled);
  }
}
