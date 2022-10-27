import { CreateCategoryUseCase } from 'codeflix-back/category/application';
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
      execute: jest.fn().mockReturnValue(mockOutput)
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

  it('should get a category', async() => {
    const id = "b55637a9-499d-4c4e-9f8e-32640d9321f3";
    const mockOutput: CreateCategoryUseCase.Output = {
      id,
      name: "Movie", 
      description: "desc", 
      is_active: true,
      created_at: new Date()
    };

    const mockUpdateUseCase = {
      execute: jest.fn().mockReturnValue(mockOutput)
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

  it('should update a category', () => {
    expect(controller).toBeDefined();
  });

  it('should get by id a category', () => {
    expect(controller).toBeDefined();
  });

  it('should delete a category', () => {
    expect(controller).toBeDefined();
  });
});
