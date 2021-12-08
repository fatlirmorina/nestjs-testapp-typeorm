import { IsEmail, IsString, Min } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @Min(6)
    name: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @Min(6)
    password: string;
}
