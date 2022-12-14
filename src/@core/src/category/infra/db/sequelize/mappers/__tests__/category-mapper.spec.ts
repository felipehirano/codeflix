import { Category } from "#category/domain";
import { LoadEntityError, UniqueEntityId } from "#seedwork/domain";
import { setuSequelize } from "#seedwork/infra/testing/helpers/db";
import { CategoryModel } from "../../model/category-model";
import { CategoryModelMapper } from "../category-mapper";

describe('CategoryModelMapper Unit Tests', () => {

    setuSequelize({models: [CategoryModel]});

    it('should throws error when category is invalid', () => {
        const model = CategoryModel.build({id: 'b55637a9-499d-4c4e-9f8e-32640d9321f3'});
        try{
            CategoryModelMapper.toEntity(model);
            fail('The category is valid, but it needs throws a LoadEntityError');
        }catch(e) {
            expect(e).toBeInstanceOf(LoadEntityError);
            expect(e.error).toMatchObject({
                name: [
                    'name should not be empty',
                    "name must be a string",
                    "name must be shorter than or equal to 255 characters"
                ]
            });
        }
    });

    it('should throw a generic error', () => {
        const error = new Error("Generic Error");
        const spyValidate = jest.spyOn(Category, 'validate').mockImplementation(() => {
            throw error
        });
        const model = CategoryModel.build({
            id: 'b55637a9-499d-4c4e-9f8e-32640d9321f3'
        });
        expect(() => CategoryModelMapper.toEntity(model)).toThrow(error);
        expect(spyValidate).toHaveBeenCalled();
        spyValidate.mockRestore();
    });

    it('should convert a category model to a category entity', () => {
        const created_at = new Date();
        const model = CategoryModel.build({
            id: 'b55637a9-499d-4c4e-9f8e-32640d9321f3',
            name: 'some value',
            description: 'some description',
            is_active: true,
            created_at
        });
        const entity = CategoryModelMapper.toEntity(model);
        expect(entity.toJSON()).toStrictEqual(
            new Category(
                {
                    name: 'some value',
                    description: 'some description',
                    is_active: true,
                    created_at
                },
                new UniqueEntityId("b55637a9-499d-4c4e-9f8e-32640d9321f3")
            ).toJSON()
        );
    });
    
});