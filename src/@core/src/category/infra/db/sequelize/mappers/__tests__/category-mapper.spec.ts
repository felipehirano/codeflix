import { Category } from "#category/domain";
import { LoadEntityError } from "#seedwork/domain";
import { Sequelize } from "sequelize-typescript";
import { CategoryModel } from "../../model/category-model";
import { CategoryModelMapper } from "../category-mapper";

describe('CategoryModelMapper Unit Tests', () => {

    let sequelize: Sequelize;

    beforeAll(() => sequelize = new Sequelize({
        dialect: 'sqlite',
        host: ':memory:',
        logging: false,
        models: [CategoryModel]
    }));

    beforeEach(async () => {
        await sequelize.sync({force: true});
    });

    afterAll(async() => {
        await sequelize.close()
    });

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
    });
});