import { IsEmail, IsString, Min } from 'class-validator';

export class LoginUserDTO {
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @Min(6)
    password: string;
}