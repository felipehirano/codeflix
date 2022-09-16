import { v4 as uuidv4 } from "uuid";
/*
Justificativa para utilizar uma lib para gerar o UUID aqui na entidade:
  - Há um limite de camadas de arquitetura entre framework/infra -> Abstracoes -> Web e Casos de uso -> Entidades.
  - Sendo as entidades o caso mais purista e o framework/infra a camada mais externa(desenho clean arch).
  - Em teoria não podemos fazer a entidade depender de alguma lib, framework ou tecnologia.
  - Mas para evitar um custo muito maior(desenvolvimento, dinheiro, etc), é justificável romper esse limite. 
*/

export type CategoryProperties = {
  name: string;
  description?: string;
  is_active?: boolean;
  created_at?: Date;
};

export class Category {
  public readonly id: string;

  constructor(public props: CategoryProperties, id?: string) {
    this.id = id || uuidv4();
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
}
