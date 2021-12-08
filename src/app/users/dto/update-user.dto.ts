import { IsEmail, IsString, Min } from 'class-validator';

export class UpdateUserDto {
    @IsString()
    @Min(6)
    name: string;

    @IsString()
    @IsEmail()
    email: string;
}
