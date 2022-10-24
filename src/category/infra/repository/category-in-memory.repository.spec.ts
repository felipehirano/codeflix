import { Category } from "#category/domain/entities/category";
import CategoryInMemoryRepository from "./category-in-memory.repository"



describe('CategoryInMemoryRepository Unit Tests', () => {
    let repository: CategoryInMemoryRepository 

    beforeEach(() => {
        repository = new CategoryInMemoryRepository();
    })

    it('should not filter items when filter param is null', async () => {
        const items = [new Category({
            name: 'first test'
        })];
        const filterSpy = jest.spyOn(items, "filter");

        let itemsFiltered = await repository["applyFilter"](items, null);
        expect(itemsFiltered).toStrictEqual(itemsFiltered);
        expect(filterSpy).not.toHaveBeenCalled()
    })

    it('should filter items using filter param', async () => {
        const items = [
            new Category({name: 'test1'}),
            new Category({name: 'TEST2'}),
            new Category({name: 'any'})
        ];

        const spyFilterMethod = jest.spyOn(items, 'filter');
        let itemsFiltered = await repository['applyFilter'](items, 'test1');
        expect(itemsFiltered).toStrictEqual([items[0]]);
        expect(spyFilterMethod).toHaveBeenCalledTimes(1);

        itemsFiltered = await repository['applyFilter'](items, 'TEST2');
        expect(itemsFiltered).toStrictEqual([items[1]]);
        expect(spyFilterMethod).toHaveBeenCalledTimes(2);

        itemsFiltered = await repository['applyFilter'](items, 'no-filter');
        expect(itemsFiltered).toHaveLength(0);
        expect(spyFilterMethod).toHaveBeenCalledTimes(3);
    })


    it('should sort items by created_at in sort_dir desc when sort param is null', async () => {
        const date = new Date();

        const items = [
            new Category({name: 'b', created_at: new Date(date.getTime() + 200)}),
            new Category({name: 'a', created_at: new Date(date.getTime() + 100)}),
            new Category({name: 'c', created_at: date})
        ];

        let itemsSortereds = await repository["applySort"](items, null, null);
        expect(itemsSortereds).toStrictEqual([items[0], items[1], items[2]]);
    })

    it('should sort items by name', async () => {
        const date = new Date();

        const items = [
            new Category({name: 'b', created_at: new Date(date.getTime() + 200)}),
            new Category({name: 'a', created_at: new Date(date.getTime() + 100)}),
            new Category({name: 'c', created_at: date})
        ];

        let itemsSortereds = await repository["applySort"](items, 'name', 'desc');
        expect(itemsSortereds).toStrictEqual([items[2], items[0], items[1]]);

        itemsSortereds = await repository["applySort"](items, 'name', 'asc');
        expect(itemsSortereds).toStrictEqual([items[1], items[0], items[2]]);
    })
})