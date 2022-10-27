import { ListCategoriesUseCase } from "codeflix-back/category/application";
import { SortDirection } from "codeflix-back/dist/@seedwork/domain/repository/repository-contracts";

export class SearchCategoryDto implements ListCategoriesUseCase.Input{
    page?: number;
    per_page?: number;
    sort?: string;
    sort_dir?: SortDirection;
    filter?: string;
}
