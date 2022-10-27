import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { CreateCategoryUseCase, DeleteCategoryUseCase, GetCategoryUseCase, ListCategoriesUseCase, UpdateCategoryUseCase } from 'codeflix-back/category/application';
import { CategoryInMemoryRepository } from 'codeflix-back/category/infra';
import CategoryRepository from 'codeflix-back/dist/category/domain/repository/category-repository';

@Module({
  controllers: [CategoriesController],
  /**
   * Para manter o caso de uso de forma purista, podemos passar um objeto com alguns valores
   * em que a dependência receberá, no caso, provide seria o servico em que estaria sendo injetado
   * e o useClass seria o nome a ser utilizado por quem quer utilizar.
   */
  providers: [
    CategoriesService,
    {
      provide: 'CategoryInMemoryRepository',
      // Caso deseje trocar o repositorio, basta alterar aqui no useClass.
      useClass:  CategoryInMemoryRepository,
    },
    {
     provide: CreateCategoryUseCase.UseCase,
     /**
      * Vai receber como parâmetro as dependências do constructor do caso de uso
      * que é passada via propriedade inject. No caso é o CategoryInMemoryRepository.
     */
     useFactory: (categoryRepo: CategoryRepository.Repository) => {
      return new CreateCategoryUseCase.UseCase(categoryRepo);
     },
     inject: ['CategoryInMemoryRepository']
    },
    {
      provide: UpdateCategoryUseCase.UseCase,
      useFactory: (categoryRepo: CategoryRepository.Repository) => {
       return new UpdateCategoryUseCase.UseCase(categoryRepo);
      },
      inject: ['CategoryInMemoryRepository']
    },
    {
      provide: DeleteCategoryUseCase.UseCase,
      useFactory: (categoryRepo: CategoryRepository.Repository) => {
       return new DeleteCategoryUseCase.UseCase(categoryRepo);
      },
      inject: ['CategoryInMemoryRepository']
    },
    {
      provide: GetCategoryUseCase.UseCase,
      useFactory: (categoryRepo: CategoryRepository.Repository) => {
       return new GetCategoryUseCase.UseCase(categoryRepo);
      },
      inject: ['CategoryInMemoryRepository']
    },
    {
      provide: ListCategoriesUseCase.UseCase,
      useFactory: (categoryRepo: CategoryRepository.Repository) => {
       return new ListCategoriesUseCase.UseCase(categoryRepo);
      },
      inject: ['CategoryInMemoryRepository']
    }
  ]
})
export class CategoriesModule {}
