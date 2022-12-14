import { SequelizeModelFactory } from "../../../../../@seedwork/infra/sequelize/sequelize-model-factory";
import { Column, DataType, PrimaryKey, Table, Model } from "sequelize-typescript";
import Chance from 'chance';

/**
 * O model e o category(entidade) possuem os mesmos campos. Porém, é necessário criar essa classe porque a entidade
 * deve apenas se preocupar com o contexto do domínio, ela não irá se preocupar com persistência. 
 * Ja o model terá a entidade como referência para persistir os dados da entidade.
 */

type CategoryModelProperties = {
    id: string;
    name: string;
    description: string | null;
    is_active: boolean;
    created_at: Date;
}

/**
 * O table trabalha criando um updateAt e createdAt por default. Como estamos fazendo o gerenciamento na mão, desativamos
 * essa opcao utilizando o timestamps: false;
*/
@Table({tableName: 'categories', timestamps: false})
export class CategoryModel extends Model<CategoryModelProperties> {
    @PrimaryKey
    @Column({type: DataType.UUID})
    id: string;

    @Column({allowNull: false, type: DataType.STRING(255)})
    name: string;

    @Column({allowNull: true, type: DataType.TEXT})
    description: string | null;

    @Column({allowNull: false, type: DataType.BOOLEAN})
    is_active: boolean;

    @Column({allowNull: false, type: DataType.DATE})
    created_at: Date;

    // Gerar uma massa de categoria falsa para testes em massa
    static factory(){

        // Importacao será feita aqui, para não utilizar essa lib em producao.
        const chance: Chance.Chance = require('chance')();
        return new SequelizeModelFactory(CategoryModel, () => ({
            id: chance.guid({version: 4}),
            name: chance.word(),
            description: chance.paragraph(),
            is_active: true,
            created_at: chance.date(),
        }))
    }
}