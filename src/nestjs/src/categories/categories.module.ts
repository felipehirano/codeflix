import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CATEGORY_PROVIDERS } from './category.providers';

@Module({
  controllers: [CategoriesController],
  /**
   * Para manter o caso de uso de forma purista, podemos passar um objeto com alguns valores
   * em que a dependência receberá, no caso, provide seria o servico em que estaria sendo injetado
   * e o useClass seria o nome a ser utilizado por quem quer utilizar.
   */
  providers: [
    ...Object.values(CATEGORY_PROVIDERS.REPOSITORIES),
    ...Object.values(CATEGORY_PROVIDERS.USE_CASES)
  ]
})
export class CategoriesModule {}
