import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'



@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullname: string;

    @Column()
    email: string;

    @Column({nullable: true})
    password?: string;


}
