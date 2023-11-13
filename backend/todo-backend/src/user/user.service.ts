import { Injectable } from "@nestjs/common";
import { UserRepository } from "./repo/user.repository";

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async findUserById(id: number) {
    try {
      return await this.userRepository.findOneOrFail({ where: { id: id } });
    } catch (error) {}
  }

  async findAll() {
    try {
      return await this.userRepository.find({
        select: [
          "email",
          "enabled",
          "firstName",
          "lastName",
          "id",
          "role",
          "todos",
        ],
      });
    } catch (error) {
      return { message: error };
    }
  }

  async findUserByEmail(email: string) {
    try {
      return await this.userRepository.findOne({ where: { email: email } });
    } catch (error) {}
  }

  async remove(id: number) {
    try {
      const user = await this.userRepository.findOne(id);
      if (user) {
        const response = await this.userRepository.delete(id);
        return { response, message: "user deleted successfully" };
      } else {
        return { message: "User not found" };
      }
    } catch (error) {
      console.log(error);
      
      return { message: error };
    }
  }
  async updateUserStatus(userId: number, enabled: boolean) {
    try {
      let user = await this.userRepository.findOne(userId);
      if (user) {
        user.enabled = enabled;
        return await this.userRepository.save(user);
      } else {
        return { message: "User not found" };
      }
    } catch (error) {
      return { message: error };
    }
  }
}
