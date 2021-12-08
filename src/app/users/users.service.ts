import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { LoginUserDTO } from './dto/login-user.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async login(loginUserDto: LoginUserDTO) {
    console.log(process.env.DB_HOST);
    const user = await this.userRepository.findOne({email: loginUserDto.email});
    if(user) {
      const isMatch = await bcrypt.compare(loginUserDto.password, user.password);
      if(isMatch)
      {
        const token = 'JWT token here';
        return {success: true, token: token, timestamp: new Date()};
      }   
    } 
    throw new HttpException('Email or password do not match in our records.', 404);
  }  

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
    return this.userRepository.find({select: ["name", "email"]});
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne(+id, {select: ["name", "email"]});
    if(!user) throw new HttpException('Could not find the given id', 404);
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne(+id);
    if(!user) throw new HttpException('Could not find the given id', 404);
    return this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne(+id);
    if(!user) throw new HttpException('Could not find the given id', 404);
    return this.userRepository.delete(+id);
  }
}
