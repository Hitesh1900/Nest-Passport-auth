import { Injectable } from '@nestjs/common';
import { UsersService } from "../users/user.service";
import { User } from "../users/user.entity";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && bcrypt.compareSync(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async register(username: string, password: string): Promise<User> {
    const hashedPassword = bcrypt.hashSync(password, 10);
    return this.usersService.createUser(username, hashedPassword);
  }
}