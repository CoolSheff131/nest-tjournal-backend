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

    @CreateDateColumn({type: 'timestamp'})
    createdAt: Date;
    @UpdateDateColumn({type: 'timestamp'})
    updatedAt: Date;
}
