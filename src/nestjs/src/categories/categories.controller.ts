import { Controller, Get, Post, Body, Put, Param, Delete, Inject, HttpCode, Query } from '@nestjs/common';
import { 
  CreateCategoryUseCase, 
  ListCategoriesUseCase, 
  UpdateCategoryUseCase, 
  DeleteCategoryUseCase,
  GetCategoryUseCase
} 
from 'codeflix-back/category/application';

import { CreateCategoryDto } from './dto/create-category.dto';
import { SearchCategoryDto } from './dto/search-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {

  /**
 * Property Injection:
 * A questão de utilizar o inject é para facilitar a leitura do código. 
 * Dessa forma não precisamos utilizar o constructor() com as dependências.
 * Com isso, o código fica mais fácil de ler, e para instanciar a classe também fica simples.
 */

  @Inject(CreateCategoryUseCase.UseCase)
  private createUseCase: CreateCategoryUseCase.UseCase;

  @Inject(UpdateCategoryUseCase.UseCase)
  private updateUseCase: UpdateCategoryUseCase.UseCase;

  @Inject(DeleteCategoryUseCase.UseCase)
  private deleteUseCase: DeleteCategoryUseCase.UseCase;

  @Inject(GetCategoryUseCase.UseCase)
  private getUseCase: GetCategoryUseCase.UseCase;

  @Inject(ListCategoriesUseCase.UseCase)
  private listUseCase: ListCategoriesUseCase.UseCase;
    

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.createUseCase.execute(createCategoryDto);
  }

  @Get()
  search(@Query() searchParams: SearchCategoryDto) {
    return this.listUseCase.execute(searchParams);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.getUseCase.execute({id});
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.updateUseCase.execute({
      id,
      ...updateCategoryDto
    });
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteUseCase.execute({id});
  }
}
