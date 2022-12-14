import { Category, CategoryProperties } from "./category";
import { omit } from "lodash";
import UniqueEntityId from "#seedwork/domain/value-objects/unique-entity-id.vo";

// Category.validate = jest.fn(); -> Criando um mock para testar o método validate.

describe("Category unity tests", () => {
  // A cada execucao de um teste, o beforeEach é chamado;
  beforeEach(() => {
    Category.validate = jest.fn();
  });

  test("Constructor of category", () => {
    let category = new Category({ name: "Movie" });
    let props = omit(category.props, "created_at");
    expect(Category.validate).toHaveBeenCalled();
    expect(props).toStrictEqual({
      name: "Movie",
      description: null,
      is_active: true,
    });
    expect(category.props.created_at).toBeInstanceOf(Date);

    category = new Category({
      name: "Movie",
      description: "some description",
      is_active: false,
    });
    let created_at = new Date();
    expect(category.props).toStrictEqual({
      name: "Movie",
      description: "some description",
      is_active: false,
      created_at,
    });

    category = new Category({
      name: "Movie",
      description: "other description",
    });
    expect(category.props).toMatchObject({
      name: "Movie",
      description: "other description",
    });

    category = new Category({
      name: "Movie",
      is_active: true,
    });
    expect(category.props).toMatchObject({
      name: "Movie",
      is_active: true,
    });

    created_at = new Date();
    category = new Category({
      name: "Movie",
      created_at,
    });
    expect(category.props).toMatchObject({
      name: "Movie",
      created_at,
    });
  });

  test("id field", () => {
    type CategoryDate = { props: CategoryProperties; id?: UniqueEntityId };

    const data: CategoryDate[] = [
      { props: { name: "Movie" } },
      { props: { name: "Movie" }, id: null },
      { props: { name: "Movie" }, id: new UniqueEntityId() },
    ];

    data.forEach((item) => {
      const category = new Category(item.props, item.id);
      expect(category.id).not.toBeNull();
      expect(category.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    });
  });

  test("getter and setter of name prop", () => {
    const category = new Category({ name: "Movie" });
    expect(category.name).toBe("Movie");

    category["name"] = "other name";
    expect(category.name).toBe("other name");
  });

  test("getter and setter of description prop", () => {
    let category = new Category({
      name: "Movie",
    });
    expect(category.description).toBeNull();

    category = new Category({
      name: "Movie",
      description: "some description",
    });
    expect(category.description).toBe("some description");

    category = new Category({
      name: "Movie",
    });
    // Using like this is a 'hacker for javascript' because the method set is private.
    category["description"] = "other description";
    expect(category.description).toBe("other description");

    category["description"] = undefined;
    expect(category.description).toBeNull();
  });

  test("getter and setter of is_active prop", () => {
    let category = new Category({
      name: "Movie",
    });
    expect(category.is_active).toBeTruthy();

    category = new Category({
      name: "Movie",
      is_active: true,
    });
    expect(category.is_active).toBeTruthy();

    category = new Category({
      name: "Movie",
      is_active: false,
    });
    expect(category.is_active).toBeFalsy();
  });

  test("getter of created_at prop", () => {
    let category = new Category({
      name: "Movie",
    });
    expect(category.created_at).toBeInstanceOf(Date);

    let created_at = new Date();
    category = new Category({
      name: "Movie",
      created_at,
    });

    expect(category.created_at).toBe(created_at);
  });

  test("update category", () => {
    const category = new Category({
      name: "Movie",
      description: "This is the Movie"
    });

    category.update("Film", "This is the Movie");
    expect(Category.validate).toHaveBeenCalledTimes(2);
    expect(category.name).toBe("Film");

    category.update("Movie", "This is the film");
    expect(category.description).toBe("This is the film");
    expect(Category.validate).toHaveBeenCalledTimes(3);

    category.update("Film", "This is the film");
    expect(Category.validate).toHaveBeenCalledTimes(4);
    expect(category).toMatchObject({
      name: "Film",
      description: "This is the film"
    })
  });

  test("activate category", () => {
    const category = new Category({
      name: "Movie"
    });
    category.activate();
    expect(category.is_active).toBeTruthy();
  });

  test("deactivate category", () => {
    const category = new Category({
      name: "Movie"
    });

    category.deactivate();
    expect(category.is_active).not.toBeTruthy();

  });
});
