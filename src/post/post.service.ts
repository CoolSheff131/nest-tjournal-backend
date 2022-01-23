import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunnerProviderAlreadyReleasedError, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { SearchPostDto } from './dto/search-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(@InjectRepository(PostEntity) private repository: Repository<PostEntity>){}

  create(createPostDto: CreatePostDto) {
    const firstParagraph = createPostDto.body.find(obj => obj.type === 'paragraph')?.data?.text
    return this.repository.save({
      title: createPostDto.title,
      body: createPostDto.body,
      tags: createPostDto.tags,
      description: firstParagraph || ''
    });
  }


  async update(id: number, updatePostDto: UpdatePostDto) {
    const find = await this.repository.findOne(+id);
    if(!find){
      throw new NotFoundException('Статья не найдена')
    }

    const firstParagraph = updatePostDto.body.find(obj => obj.type === 'paragraph')?.data?.text
    return this.repository.update(id,{
      title: updatePostDto.title,
      body: updatePostDto.body,
      tags: updatePostDto.tags,
      description: firstParagraph||'',
    });
  }

  findAll() {
    return this.repository.find({
      order: {
        createdAt: 'DESC'
      }
    });
  }
  async popular() {
    const qp = this.repository.createQueryBuilder()
    qp.orderBy('views','DESC')
    qp.limit(10)

    const [items, total] = await qp.getManyAndCount()

    return{
      items,
      total,
    }
  }

  async search(dto: SearchPostDto) {
    const qb = this.repository.createQueryBuilder('p')
    qb.limit(dto.limit || 0)
    qb.take(dto.take || 10)
    if(dto.views){
      qb.orderBy('views',dto.views)
    }
    if(dto.body){
      qb.andWhere(`p.body ILIKE :body`)
    }
    if(dto.title){
      qb.andWhere(`p.title ILIKE :title`)
    }
    if(dto.tag){
      qb.andWhere(`p.tags ILIKE :tag`)
    }
    qb.setParameters({
      title: `%${dto.title}%`,
      body: `%${dto.body}%`,
      tag: `%${dto.tag}%`,
      views: dto.views || '',
    })
    const [items, total] = await qb.getManyAndCount()
    return {items,total}

  }

  async findOne(id: number) {
    const find = await this.repository.findOne(+id);
    if(!find){
      throw new NotFoundException('Статья не найдена')
    }
    await this.repository.createQueryBuilder('posts')
    .whereInIds(id)
    .update()
    .set({
      views: () => 'views + 1'
    })
    .execute()
    return find;
  }

  

  async remove(id: number) {
    const find = await this.repository.findOne(+id);
    if(!find){
      throw new NotFoundException('Статья не найдена')
    }
    return this.repository.delete(id);
  }
}
