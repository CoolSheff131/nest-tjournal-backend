import { CommentEntity } from 'src/comment/entities/comment.entity';
import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'



@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullname: string;

    @Column({unique: true})
    email: string;

    @Column({nullable: true})
    password?: string;

    @OneToMany(()=>CommentEntity,(comment)=>comment.user,{
        eager: false,
        nullable: true,
    })
    comments: CommentEntity[];

    @CreateDateColumn({type: 'timestamp'})
    createdAt: Date;
    @UpdateDateColumn({type: 'timestamp'})
    updatedAt: Date;
}
