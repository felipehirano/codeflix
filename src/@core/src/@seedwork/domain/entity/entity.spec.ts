import UniqueEntityId from "../value-objects/unique-entity-id.vo";
import {validate as uuidValidate} from 'uuid';
import Entity from "./entity";

class StubEntity extends Entity<{prop1: string; prop2: number}>{
    
}
describe('Entity Unit Tests', () => {

    it('should set props and id', ()=>{
        const arrange = {prop1: "prop1 value", prop2: 10}
        const entity = new StubEntity(arrange);
        expect(entity.props).toStrictEqual(arrange);
        expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
        expect(entity.id).not.toBeNull();
        expect(uuidValidate(entity.id)).toBeTruthy();
    })

    it('should accept a valida uuid', () => {
        const arrange = {prop1: "prop1 value", prop2: 10};
        const uniqueEntityId = new UniqueEntityId();
        const entity = new StubEntity(arrange, uniqueEntityId);

        expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
        expect(entity.id).toBe(uniqueEntityId.getValue());
    });

    it('should convert a entity to a javascrip object', () => {
        const arrange = {prop1: "prop1 value", prop2: 10};
        const uniqueEntityId = new UniqueEntityId();
        const entity = new StubEntity(arrange, uniqueEntityId);

        expect(entity.toJSON()).toStrictEqual({
            id: entity.id,
            ...arrange,
        })
    });
});