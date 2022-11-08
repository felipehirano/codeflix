import { Category, CategoryRepository } from "#category/domain";
import { NotFoundError, UniqueEntityId } from "#seedwork/domain";
import { CategoryModelMapper } from "../mappers/category-mapper";
import { CategoryModel } from "../model/category-model";

export class CategorySequelizeRepository implements CategoryRepository.Repository {

    sortableFields: string[] = ["name", "created_at"];

    constructor(private categoryModel: typeof CategoryModel) {}

    async insert(entity: Category): Promise<void> {
        await this.categoryModel.create(entity.toJSON());
    }

    async findById(id: string | UniqueEntityId): Promise<Category> {
        const _id = `${id}`;
        const model = await this._get(_id);
        return CategoryModelMapper.toEntity(model);
    }

    async findAll(): Promise<Category[]> {
        throw new Error("Method not implemented.");
    }
    async update(entity: Category): Promise<void> {
        throw new Error("Method not implemented.");
    }

    private async _get(id: string):Promise<CategoryModel> {
        return this.categoryModel.findByPk(id, {
            rejectOnEmpty: new NotFoundError(`Entity not found using . ${id}`)
        });
    }
    
    async delete(id: string | UniqueEntityId): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async search(props: CategoryRepository.SearchParams): Promise<CategoryRepository.SearchResult> {
        throw new Error("Method not implemented.");
    }
}