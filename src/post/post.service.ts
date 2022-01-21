import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(@InjectRepository(PostEntity) private repository: Repository<PostEntity>){}

  create(createPostDto: CreatePostDto) {
    return this.repository.save(createPostDto);
  }

  findAll() {
    return this.repository.find({
      order: {
        createdAt: 'DESC'
      }
    });
  }
  async popular() {
    const qp = this.repository.createQueryBuilder('p')
    qp.orderBy('views','DESC')
    qp.limit(10)

    const [items, total] = await qp.getManyAndCount()

    return{
      items,
      total,
    }
  }

  async findOne(id: number) {
    const find = await this.repository.findOne(+id);
    if(!find){
      throw new NotFoundException('Статья не найдена')
    }
    return find;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const find = await this.repository.findOne(+id);
    if(!find){
      throw new NotFoundException('Статья не найдена')
    }
    return this.repository.update(id,updatePostDto);
  }

  async remove(id: number) {
    const find = await this.repository.findOne(+id);
    if(!find){
      throw new NotFoundException('Статья не найдена')
    }
    return this.repository.delete(id);
  }
}
