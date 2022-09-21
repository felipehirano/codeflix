import UniqueEntityId from "../value-objects/unique-entity-id.vo";

export default abstract class Entity<T> {
  public readonly uniqueEntityId: UniqueEntityId;

  constructor(public readonly props: T, id?: UniqueEntityId) {
    this.uniqueEntityId = id || new UniqueEntityId();
  }

  get id(): string {
    return this.uniqueEntityId.getValue();
  }

  toJSON(): Required<{ id: string } & T> {
    return {
      id: this.id,
      ...this.props,
    } as Required<{ id: string } & T>;
  }
}
