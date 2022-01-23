import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'



@Entity('posts')
export class PostEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({type: 'jsonb'})
    body: any[];

    @Column()
    description: string

    @Column({default: 0})
    views?: number;

    @Column({nullable: true})
    tags?: string;

    @CreateDateColumn({type: 'timestamp'})
    createdAt: Date;
    @UpdateDateColumn({type: 'timestamp'})
    updatedAt: Date;
}
