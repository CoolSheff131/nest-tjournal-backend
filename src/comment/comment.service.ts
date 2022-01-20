import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentEntity } from './entities/comment.entity';

@Injectable()
export class CommentService {

  constructor(@InjectRepository(CommentEntity) private repository: Repository<CommentEntity>){}

  create(createCommentDto: CreateCommentDto) {
    return this.repository.save({
      text: createCommentDto.text,
      post: {id: createCommentDto.postId},
      user: {id: 2},
    });
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.find(+id);
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return this.repository.update(id,updateCommentDto);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
