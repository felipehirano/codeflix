import { deepFreeze } from "../utils/object";

export default abstract class ValueObject<Value = any> {
    // Utilizando o readonly e o Object.freeze, tornamos esse VO como imutável, que é como ele deve ser.

    protected readonly _value: Value;

    constructor(value: Value) {
        this._value = deepFreeze(value);
    }

    getValue(): Value {
        return this._value;
    }

    toString = () => {
        if(typeof this._value !== "object" || this._value === null) {
            try{
                return this._value.toString();
            }catch(e){
                return this._value + "";
            }
        }

        const valueStr = this._value.toString();

        return valueStr === "[object Object]" ? JSON.stringify(this._value) : valueStr; 
    }
}