import { IsNumber, IsString, IsUrl } from "class-validator";

export class CreateCredentialDto {
    @IsNumber()
    userId: number

    @IsString()
    title: string

    @IsString()
    user: string

    @IsString()
    password: string

    @IsUrl()
    url: string
}
