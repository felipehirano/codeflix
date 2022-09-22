// Objeto Valor
import ValidatorRules from "../../../@seedwork/validators/validator-rules";
import Entity from "../../../@seedwork/domain/entity/entity";
import UniqueEntityId from "../../../@seedwork/domain/value-objects/unique-entity-id.vo";
import CategoryValidatorFactory from "../validators/category.validator";

export type CategoryProperties = {
  name: string;
  description?: string;
  is_active?: boolean;
  created_at?: Date;
};

// Entidade - conjunto de atributos e objetos de valores com uma identidade e comportamentos(Category)
export class Category extends Entity<CategoryProperties> {
  constructor(public props: CategoryProperties, id?: UniqueEntityId) {
   Category.validate(props);
    super(props, id);
    this.description = this.props.description; // Call the method setDescription
    this.is_active = this.props.is_active; // Call the method set setIsActive
    this.props.created_at = this.props.created_at ?? new Date();
  }

  update(name: string, description: string) {
    Category.validate({
      name,
      description
    });
    this.name = name;
    this.description = description;
  }

  // Por não poder utilizar o this antes do super, utilizei o static para poder fazer a validacao antes de chamar o super
  // Esse método será compartilhado entre todas as instâncias dessa classe, e para acessá-la, deve se utilizar o nome da classe ao invés do this.
  // static validate(props: Omit<CategoryProperties, 'created_at'>) {
  //   ValidatorRules.values(props.name, 'name').required().string().maxLength(255);
  //   ValidatorRules.values(props.description, 'description').string();
  //   ValidatorRules.values(props.is_active, 'is_active').boolean();
  // }

  static validate(props: CategoryProperties) {
    const validator = CategoryValidatorFactory.create();
    validator.validate(props);
  }


  activate() {
    this.props.is_active = true;
  }

  deactivate() {
    this.props.is_active = false;
  }

  get name(): string {
    return this.props.name;
  }

  private set name(value: string) {
    this.props.name = value ?? null;
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
}
