import { Category } from "./category";

describe("Category unity tests", () => {
  test("Constructor of category", () => {
    const created_at = new Date();
    // Arrange
    const props = {
      name: "Movie",
      description: "some description",
      is_active: true,
      created_at,
    };

    //Act
    const category: Category = new Category(props);

    //Assert
    expect(category.props).toStrictEqual({
      name: "Movie",
      description: "some description",
      is_active: true,
      created_at,
    });

    // expect(category.name).toBe("Movie");
    // expect(category.description).toBe("some description");
    // expect(category.is_active).toBeTruthy();
    // expect(category.created_at).toBe(created_at);
  });
});
