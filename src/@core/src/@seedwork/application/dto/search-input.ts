/**
 * Para não ocorrer uma dependência direta da camada de useCase da camada de entidades,
 * não estou reaproveitando o SearchProps, pois caso ele seja alterado, vai aumentar 
 * a complexidade para manutencao do código. Justificando assim o DRY(Don't repeat yourself).
 */

import { SortDirection } from "../../domain/repository/repository-contracts";


export type SearchInputDto<Filter = string> = {
    page?: number;
    per_page?: number;
    sort?: string | null;
    sort_dir?: SortDirection | null;
    filter?: Filter | null;  
}