import CategoryRepository from "../../domain/repository/category-repository";
import UseCase from "../../../@seedwork/application/use-case";
import { SearchInputDto } from "../../../@seedwork/application/dto/search-input";
import { PaginationOutputDto, PaginationOutPutMapper } from "../../../@seedwork/application/dto/pagination-output";
import { CategoryOutput, CategoryOutputMapper } from "../dto/category-output";

export default class ListCategoriesUseCase implements UseCase<Input, Output> {

    constructor(private categoryRepo: CategoryRepository.Repository){}

    async execute(input: Input): Promise<Output> {
        const params = new CategoryRepository.SearchParams(input);
        const searchResult = await this.categoryRepo.search(params);
        return this.toOutput(searchResult);
    }

    private toOutput(searchResult: CategoryRepository.SearchResult): Output {
        const items = searchResult.items.map(item => ({
            ...CategoryOutputMapper.toOutput(item)
        }));

        const pagination = PaginationOutPutMapper.toOutput(searchResult)

        return {
            items,
            ...pagination
        }
    }
}

export type Input = SearchInputDto;
export type Output = PaginationOutputDto<CategoryOutput>