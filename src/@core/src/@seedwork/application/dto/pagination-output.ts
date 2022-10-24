import { SearchResult } from "../../domain/repository/repository-contracts";

export type PaginationOutputDto<E, Filter = string> = {
    items: E[];
    total: number;
    current_page: number;
    per_page: number;
    sort: string | null;
    sort_dir: string | null;
    filter: Filter | null;
};

export class PaginationOutPutMapper {
    static toOutput(result: SearchResult) {
        return {
            total: result.total,
            current_page: result.current_page,
            per_page: result.per_page,
            last_page: result.last_page,
            sort: result.sort,
            sort_dir: result.sort_dir,
            filter: result.filter
        }
    }
}