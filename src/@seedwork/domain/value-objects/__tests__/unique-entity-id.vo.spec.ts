import InvalidUuidError from "../../../errors/invalid-uuid.error";
import UniqueEntityId from "../unique-entity-id.vo";
import { validate as uuidValidate } from "uuid";

function spyValidateMethod() {
  return jest.spyOn(UniqueEntityId.prototype as any, "validate");
}

describe("UniqueEntityId Unit Tests", () => {
  const validateSpy = spyValidateMethod();

  it("should throw error when uuid is invalid", () => {
    expect(() => new UniqueEntityId("fake")).toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should accept a uuid passed in constructor", () => {
    const uuid = "b55637a9-499d-4c4e-9f8e-32640d9321f3";
    const vo = new UniqueEntityId(uuid);
    expect(vo.getValue()).toBe(uuid);
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should accept a uuid passed in constructor", () => {
    const vo = new UniqueEntityId();
    expect(uuidValidate(vo.getValue())).toBeTruthy();
    expect(validateSpy).toHaveBeenCalled();
  });
});
