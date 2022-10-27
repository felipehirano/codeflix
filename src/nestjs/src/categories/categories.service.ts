import { Inject, Injectable } from '@nestjs/common';
import { CreateCategoryUseCase, ListCategoriesUseCase } from 'codeflix-back/category/application';
import { UpdateCategoryDto } from './dto/update-category.dto';

/**
   * Os providers no nest, são carregados por default utilizando a tag @Injectable
   * passando apenas o tipo que ele terá, no caso CategoriesService é um exemplo.
   * No formato default, enquanto a aplicacao estiver rodando, apenas uma instância dela 
   * será fornecida pra toda aplicacao, seguindo o padrão singleton. Caso, seja necessário
   * é possível mudar o scope para o tipo de injecao como Rest que sempre ciará uma instância
   * para cada chamada ou transient que para qualquer coisa será gerada uma nova instância do 
   * servico.
 */
@Injectable()
export class CategoriesService {

  /**
   * A questão de utilizar o inject é para facilitar a leitura do código. 
   * Dessa forma não precisamos utilizar o constructor() com as dependências.
   * Com isso, o código fica mais fácil de ler, e para instanciar a classe também fica simples.
   */

  @Inject(CreateCategoryUseCase.UseCase)
  private createUseCase: CreateCategoryUseCase.UseCase;

  @Inject(ListCategoriesUseCase.UseCase)
  private listUseCase: ListCategoriesUseCase.UseCase;

  create(createCategoryDto: CreateCategoryUseCase.Input) {
    return this.createUseCase.execute(createCategoryDto);
  }

  search(input: ListCategoriesUseCase.Input) {
    return this.listUseCase.execute(input);
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
