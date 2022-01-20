import {IsEmail,Length} from  'class-validator'

export class CreateUserDto {
    @Length(3,32, {message:'Минимум 3'})
    fullname:string;

    @IsEmail(undefined, {message: 'Неверная почта'})
    email: string;

    @Length(6,32, {message:'Минимум 6'})
    password?: string;
}
