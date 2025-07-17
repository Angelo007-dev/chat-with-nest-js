import { IsNotEmpty } from 'class-validator';


export class CreateArticleDto {
    @IsNotEmpty()
    nom: string;

    @IsNotEmpty()
    quantity: number
}
