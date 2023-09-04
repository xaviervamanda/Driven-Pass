import { IsNumber, IsString } from "class-validator";

export class CreateNoteDto {
    @IsNumber()
    userId: number

    @IsString()
    title: string

    @IsString()
    description: string
}
