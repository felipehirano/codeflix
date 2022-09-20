// Objeto Valor
import Entity from "../../../@seedwork/domain/entity/entity";
import UniqueEntityId from "../../../@seedwork/domain/value-objects/unique-entity-id.vo";

export type CategoryProperties = {
  name: string;
  description?: string;
  is_active?: boolean;
  created_at?: Date;
};

// Entidade - conjunto de atributos e objetos de valores com uma identidade e comportamentos(Category)
export class Category extends Entity<CategoryProperties> {
  constructor(public props: CategoryProperties, id?: UniqueEntityId) {
    super(props, id);
    this.description = this.props.description; // Call the method setDescription
    this.is_active = this.props.is_active ?? true; // Call the method set setIsActive
    this.props.created_at = this.props.created_at ?? new Date();
  }

  get name(): string {
    return this.props.name;
  }

  get description() {
    return this.props.description;
  }

  private set description(value) {
    this.props.description = value ?? null;
  }

  get is_active() {
    return this.props.is_active;
  }

  private set is_active(value: boolean) {
    this.props.is_active = value ?? true;
  }

  get created_at(): any {
    return this.props.created_at;
  }

  update(name: string, description: string) {
    this.props.name = name;
    this.props.description = description;
  }

  activate() {
    this.props.is_active = true;
  }

  deactivate() {
    this.props.is_active = false;
  }
}
