export class SequelizeModelFactory {

    constructor(private model, private factoryProps: () => any){}

    async create(data?) {
        return this.model.create(data ? data : this.factoryProps());
    }

    // Criar instância sem salvar no banco de dados
    make() {

    }

    async bulkCreate() {

    }

    // Criar instância sem salvar no banco de dados
    bulkMake() {

    }
}