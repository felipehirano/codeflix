import CategoryRepository from "../../domain/repository/category-repository";
import { Category } from "../../domain/entities/category";
import { CategoryOutput, CategoryOutputMapper } from "../dto/category-output";
import { default as DefaultUseCase } from "../../../@seedwork/application/use-case";
/**
 * Casos de uso: Processar a criacao da categoria aceita o inputBoundarie e retorna o OutputBoundarie.
 */
export namespace CreateCategoryUseCase {
    export class UseCase implements DefaultUseCase<Input, Output> {
        /**
         * UseCase dependeria da camada de infra, porém com a implementacao do contrato do repositorio,
         * invertemos a dependência para o UseCase depender da camada de domínio e o contrato irá depender da infra.
         */
    
        constructor(private categoryRepo: CategoryRepository.Repository){}
    
        async execute(input: Input): Promise<Output> {
            const entity = new Category(input);
            await this.categoryRepo.insert(entity);
            return CategoryOutputMapper.toOutput(entity);
        }
    }

    /**
     * Fazer a conversão de dados para saída de casos de uso pois as camadas mais exteriores, 
     * não devem conhecer as camadas mais interiores e vice-versa.
     * São DTOs: Servem para comunicacao entre camadas.
     */

    /**Input e o Output são como se fossem o request e o response
     * é bom que eles sejam sempre objetos para facilitar a manutencao e escalabilidade
     * dimunuindo assim a chance de algum erro;
     */

    export type Input = {
        name: string;
        description?: string;
        is_active?: boolean;
    }

    export type Output = CategoryOutput;
}


export default CreateCategoryUseCase
