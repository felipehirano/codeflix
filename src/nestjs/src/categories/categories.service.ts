import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
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
  create(createCategoryDto: CreateCategoryDto) {
    return 'This action adds a new category';
  }

  findAll() {
    return `This action returns all categories`;
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
