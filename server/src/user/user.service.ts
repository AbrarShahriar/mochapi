import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import * as argon from '@node-rs/argon2';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDTO) {
    const { password, email } = createUserDto;
    const hashedPassword = await argon.hash(password);

    try {
      console.log('User created');
      return await this.usersRepository.save({
        email,
        password: hashedPassword,
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async findUserByEmail(email: string) {
    return await this.usersRepository.findOne({ where: { email } });
  }
  async findUserById(userId: number) {
    return await this.usersRepository.findOne({ where: { id: userId } });
  }
  async updateHashedRefreshToken(
    userId: number,
    hashedRefreshToken: string | null,
  ) {
    const query: FindOptionsWhere<User> = {
      id: userId,
    };
    return this.usersRepository.update(query, {
      hashedRefreshToken,
    });
  }
}
