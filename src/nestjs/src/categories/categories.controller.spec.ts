import { CreateCategoryUseCase, GetCategoryUseCase, ListCategoriesUseCase } from 'codeflix-back/category/application';
import { SortDirection } from 'codeflix-back/dist/@seedwork/domain/repository/repository-contracts';
import { CategoriesController } from './categories.controller';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

describe('CategoriesController Unit Tests', () => {
  let controller: CategoriesController;

  beforeEach(async () => {
    controller = new CategoriesController();
  });

  it('should creates a category', async () => {
    const mockOutput: CreateCategoryUseCase.Output = {
      id: "b55637a9-499d-4c4e-9f8e-32640d9321f3",
      name: "Movie", 
      description: "desc", 
      is_active: true,
      created_at: new Date()
    };

    const mockCreateUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(mockOutput))
    };

    controller['createUseCase'] = mockCreateUseCase as any;

    const input: CreateCategoryDto = {
      name: "Movie", 
      description: "desc", 
      is_active: true
    };

    const output = await controller.create(input);
    expect(mockCreateUseCase.execute).toHaveBeenCalledWith(input);
    expect(mockOutput).toStrictEqual(output);

  });

  it('should update a category', async() => {
    const id = "b55637a9-499d-4c4e-9f8e-32640d9321f3";
    const mockOutput: CreateCategoryUseCase.Output = {
      id,
      name: "Movie", 
      description: "desc", 
      is_active: true,
      created_at: new Date()
    };

    const mockUpdateUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(mockOutput))
    };

    controller['updateUseCase'] = mockUpdateUseCase as any;

    const input: UpdateCategoryDto = {
      name: "Movie", 
      description: "desc", 
      is_active: true
    };

    const output = await controller.update(id, input);
    expect(mockUpdateUseCase.execute).toHaveBeenCalledWith({id, ...input});
    expect(mockOutput).toStrictEqual(output);
  });

  it('should delete a category', async () => {
    const id = "b55637a9-499d-4c4e-9f8e-32640d9321f3";
    const mockOutput = undefined;
    const mockDeleteUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(mockOutput)) 
    }

    controller['deleteUseCase'] = mockDeleteUseCase as any;

    // Como o método remove não possui um retorno, então é necessário
    // verificar se ele removeu do banco e realmente deu sucesso (devido ao async).
    // Para isso também, é necessário alterar o tipo de mock return que será uma Promise.resolve
    expect(controller.remove(id)).toBeInstanceOf(Promise);

    const output = await controller.remove(id);
    expect(mockDeleteUseCase.execute).toHaveBeenCalledWith({ id });
    expect(mockOutput).toStrictEqual(output);
  });
  it('should find one category', async () => {
    const id = "b55637a9-499d-4c4e-9f8e-32640d9321f3";
    const mockOutput: GetCategoryUseCase.Output = {
      id,
      name: "Movie", 
      description: "desc", 
      is_active: true,
      created_at: new Date()
    };

    const mockGetUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(mockOutput))
    };

    controller['getUseCase'] = mockGetUseCase as any;

    const output = await controller.findOne(id);
    expect(mockGetUseCase.execute).toHaveBeenCalledWith({id});
    expect(mockOutput).toStrictEqual(output);
  });

  it('should list categories', async () => {
    const mockOutput: ListCategoriesUseCase.Output = {
      items: [
        {
          id: "b55637a9-499d-4c4e-9f8e-32640d9321f3",
          name: "Movie", 
          description: "desc", 
          is_active: true,
          created_at: new Date()
        }
      ],
      current_page: 1,
      last_page: 1,
      per_page: 1,
      total: 1,
      sort: null,
      sort_dir: null,
      filter: null
    }

    const mockListUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(mockOutput))
    }

    controller['listUseCase'] = mockListUseCase as any;

    const searchParams = {
      page: 1,
      per_page: 2,
      sort: 'name',
      sort_dir: 'desc' as SortDirection,
      filter: 'test'
    };

    const output = await controller.search(searchParams);
    expect(mockListUseCase.execute).toHaveBeenCalledWith(searchParams);
    expect(mockOutput).toStrictEqual(output);

  });
 
});
