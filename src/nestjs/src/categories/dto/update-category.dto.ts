import { UpdateCategoryUseCase } from "codeflix-back/category/application";

export class UpdateCategoryDto implements Omit<UpdateCategoryUseCase.Input, 'id'>{
    name: string;
    description?: string;
    is_active?: boolean;
}
