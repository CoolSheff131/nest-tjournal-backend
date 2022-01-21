import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>
  ){}

  create(createUserDto: CreateUserDto) {
    return this.repository.save(createUserDto);
  }

  findAll() {
    return this.repository.find();
  }

  async findById(id: number) {
    const find = await this.repository.findOne(+id);
    if(!find){
      throw new NotFoundException('Статья не найдена')
    }
    return find;
  }
  async findByCond(cond: LoginUserDto) {
    const find = await this.repository.findOne(cond);
    if(!find){
      throw new NotFoundException('Статья не найдена')
    }
    return find;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const find = await this.repository.findOne(+id);
    if(!find){
      throw new NotFoundException('Статья не найдена')
    }
    return this.repository.update(id,updateUserDto);
  }

  async remove(id: number) {
    const find = await this.repository.findOne(+id);
    if(!find){
      throw new NotFoundException('Статья не найдена')
    }
    return this.repository.delete(id);
  }
}
