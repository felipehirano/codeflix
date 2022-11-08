import { Category } from "#category/domain";
import { EntityValidationError, UniqueEntityId, LoadEntityError } from "#seedwork/domain";
import { CategoryModel } from "../model/category-model";

export class CategoryModelMapper {
    static toEntity(model: CategoryModel) {
        const { id, ...otherData } = model.toJSON();
        try{
            return new Category(otherData, new UniqueEntityId(id));
        }catch(e) {
            if(e instanceof EntityValidationError) {
                throw new LoadEntityError(e.error);
            }
            throw e;
        }
    }
}