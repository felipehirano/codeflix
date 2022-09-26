import Entity from "../entity/entity";
import NotFoundError from "../errors/not-found.error";
import InMemoryRepository from "./in-memory-repository";

type StubEntityProps = {
    name: string;
    price: number;
}

class StubEntity extends Entity<StubEntityProps>{}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {}

describe('InMemoryRepository Unit Tests', () => {
    let repository: StubInMemoryRepository;

    beforeEach(() => {
        repository = new StubInMemoryRepository();
    });
    it('should inserts a new entity', async () => {
        const entity = new StubEntity({name: "name value", price: 5})
        await repository.insert(entity);
        expect(entity.toJSON()).toStrictEqual(repository.items[0].toJSON());
    });

    it('should throws errors when entity not found', async () => {
        expect(repository.findById('fake id')).rejects
            .toThrow(new NotFoundError(`Entity not found using . fake id`))

        expect(repository.findById('b55637a9-499d-4c4e-9f8e-32640d9321f3')).rejects
            .toThrow(new NotFoundError(`Entity not found using . b55637a9-499d-4c4e-9f8e-32640d9321f3`))
    });

    it('should finds entity by id', async () => {
        const entity = new StubEntity({name: "name value", price: 5})
        await repository.insert(entity);

        let entityFound = await repository.findById(entity.id);
        expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());

        entityFound = await repository.findById(entity.uniqueEntityId);
        expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());
    });

    it('should returns all entities', async () => {
        const entity = new StubEntity({name: "name value", price: 5})
        await repository.insert(entity);

       const entities = await repository.findAll();

       expect(entities).toStrictEqual([entity]);
    });

    it('should throws error on update when entity not exist', async () => {
        const entity = new StubEntity({name: "name value", price: 5})
        await repository.insert(entity);

        expect(repository.update(entity)).rejects.toThrow(
            new NotFoundError(`Entity not found using . ${entity.id}`)
        );
    });

    it('should updates an entity', async () => {
        const entity = new StubEntity({name: "name value", price: 5})
        await repository.insert(entity);

        const entityUpdated = new StubEntity(
            {name: 'updated', price: 1}, 
            entity.uniqueEntityId
        )

        await repository.update(entityUpdated);

        expect(entityUpdated.toJSON()).toStrictEqual(repository.items[0].toJSON());
    });

    it('should throws errors on delete when entity not found', async () => {
        expect(repository.delete('fake id')).rejects
            .toThrow(new NotFoundError(`Entity not found using . fake id`))

        expect(repository.delete('b55637a9-499d-4c4e-9f8e-32640d9321f3')).rejects
            .toThrow(new NotFoundError(`Entity not found using . b55637a9-499d-4c4e-9f8e-32640d9321f3`))
    });

    it('should deletes an entity', async () => {
        const entity = new StubEntity({name: "name value", price: 5})
        await repository.insert(entity);
        await repository.delete(entity.id);
        expect(repository.items).toHaveLength(0);

        await repository.insert(entity);
        await repository.delete(entity.uniqueEntityId);
        expect(repository.items).toHaveLength(0);
    });
});