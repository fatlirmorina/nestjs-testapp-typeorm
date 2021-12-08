import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    let password = await bcrypt.hash(createUserDto.password, 10);
    const createUser = {
      password: password,
      name: createUserDto.name,
      email: createUserDto.email
    }
    const saveFeature = this.userRepository.create(createUser);
    this.userRepository.save(saveFeature);
    return {name: createUser.name, email: createUser.email};
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<UpdateUserDto> {
    const user = await this.userRepository.findOne(id);
    if(!user) throw new HttpException('Could not find the given id', 404);
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne(id);
    if(!user) throw new HttpException('Could not find the given id', 404);
    return this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne(id);
    if(!user) throw new HttpException('Could not find the given id', 404);
    return this.userRepository.delete(id);
  }
}
