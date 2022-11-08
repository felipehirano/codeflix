import { Category } from "#category/domain";
import { NotFoundError } from "#seedwork/domain";
import { Sequelize } from "sequelize-typescript";
import { CategoryModel } from "../../model/category-model";
import { CategorySequelizeRepository } from "../category-repository";

describe('CategorySequelizeRepository Unit Tests', () => {

    let sequelize: Sequelize;
    let repository: CategorySequelizeRepository;

    beforeAll(() => sequelize = new Sequelize({
        dialect: 'sqlite',
        host: ':memory:',
        logging: false,
        models: [CategoryModel]
    }));

    beforeEach(async () => {
        await sequelize.sync({force: true});
        repository = new CategorySequelizeRepository(CategoryModel);
    });

    afterAll(async() => {
        await sequelize.close()
    });

    it('should insert a new entity', async () => {
        let category = new Category({name: 'Movie'});
        await repository.insert(category);
        let model = await CategoryModel.findByPk(category.id);

        expect(model.toJSON()).toStrictEqual(category.toJSON());

        category = new Category({name: 'Movie', description: 'some description', is_active: false});
        await repository.insert(category);
        model = await CategoryModel.findByPk(category.id);
        expect(model.toJSON()).toStrictEqual(category.toJSON());
    });

    it('should throws errors when entity not found', async () => {
        await expect(repository.findById('fake id')).rejects
            .toThrow(new NotFoundError(`Entity not found using . fake id`))

        await expect(repository.findById('b55637a9-499d-4c4e-9f8e-32640d9321f3')).rejects
            .toThrow(new NotFoundError(`Entity not found using . b55637a9-499d-4c4e-9f8e-32640d9321f3`))
    });

    it('should finds entity by id', async () => {
        const entity = new Category({name: "Movie"})
        await repository.insert(entity);

        let entityFound = await repository.findById(entity.id);
        expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());

        entityFound = await repository.findById(entity.uniqueEntityId);
        expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());
    });
});