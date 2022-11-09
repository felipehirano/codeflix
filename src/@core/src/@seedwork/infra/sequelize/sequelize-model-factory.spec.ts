import { Table, Column, PrimaryKey, Model, DataType, Sequelize } from "sequelize-typescript";
import { SequelizeModelFactory } from "./sequelize-model-factory";
import _chance from 'chance';
import {validate as uuidValidate} from 'uuid';
import { setuSequelize } from "../testing/helpers/db";

const chance = _chance();

@Table({})
class StubModel extends Model {
    @PrimaryKey
    @Column({ type: DataType.UUID})
    declare id?: any;

    @Column({allowNull: false, type: DataType.STRING(255)})
    declare name;

    static mockFactory = jest.fn(() => ({
        id: chance.guid({version: 4}),
        name: chance.word()
    }))

    static factory(){
        return new SequelizeModelFactory(StubModel, StubModel.mockFactory);
    }
}

describe('SequelizeModelFactory Unit Tests', () => {

    setuSequelize({models: [StubModel]});
    test('create method', async () => {

        let model = await StubModel.factory().create();
        expect(uuidValidate(model.id)).toBeTruthy();
        expect(model.name).not.toBeNull();
        expect(StubModel.mockFactory).toHaveBeenCalled();

        let modelFound = await StubModel.findByPk(model.id);
        expect(model.id).toBe(modelFound.id);

        model = await StubModel.factory().create({
            id: 'b55637a9-499d-4c4e-9f8e-32640d9321f3',
            name: 'test'
        });

        expect(model.id).toBe('b55637a9-499d-4c4e-9f8e-32640d9321f3');
        expect(model.name).toBe('test');
        expect(StubModel.mockFactory).toHaveBeenCalledTimes(1);

        modelFound = await StubModel.findByPk(model.id);
        expect(model.id).toBe(modelFound.id);
    });
});