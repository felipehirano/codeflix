export class SequelizeModelFactory {

    private _count = 1;

    constructor(private model, private defaultFactoryProps: () => any){}

    async create(data?) {
        return this.model.create(data ? data : this.defaultFactoryProps());
    }

    // Criar instância sem salvar no banco de dados
    make(data?) {
        return this.model.build(data ? data : this.defaultFactoryProps());
    }

    count(count: number) {
        this._count = count;
        return this;
    }

    async bulkCreate(factoryProps?: (index: number) => any) {
        const data = new Array(this._count)
            .fill(factoryProps ? factoryProps : this.defaultFactoryProps)
            .map((factory, index) => factory(index));

        return this.model.bulkCreate(data);
    }

    // Criar instância sem salvar no banco de dados
    bulkMake(factoryProps?: (index: number) => any) {
        const data = new Array(this._count)
            .fill(factoryProps ? factoryProps : this.defaultFactoryProps)
            .map((factory, index) => factory(index));

        return this.model.bulkBuild(data);
    }
}