import { IsBoolean, IsIn, IsNumber, IsString } from "class-validator"

export class CreateCardDto {
    @IsNumber()
    userId: number

    @IsString()
    title: string

    @IsNumber()
    number: number

    @IsString()
    name: string
    
    @IsString()
    CVC: string

    @IsString()
    expirationDate: string

    @IsString()
    password: string

    @IsBoolean()
    virtual: boolean
    
    @IsString()
    @IsIn(["credito", "debito", "ambos"])
    type: string
}
