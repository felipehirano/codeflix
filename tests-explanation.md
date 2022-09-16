# This is a file to explain why i used certain function to describe and write the unit tests.

## toStrictEqual

- This method will compare all atributes and values of array that is passed as param;
- If i wanna omit some object to this method not compare i can use the lodash library the lodash library to omit some properties for this object;
  Ex:
  ```
    let props = omit(category.props, "created_at");
    expect(props).toStrictEqual({
        name: "Movie",
        description: null, is_active: true,
    });
    expect(category.props.created_at).toBeInstanceOf(Date);
  ```
- In the example above, i`m ommiting the prop "created_at", but if i wanna see if we are receiving this prop, i can use the method "toBeInstanceOf";

## toMatchObject

- This method will check that a JavaScript object matches a subset of the properties of an object.

  Ex:

  ```
    let category = new Category({
        name: "Movie",
        description: "other description",
        is_active: true,
    });

    expect(category.props).toMatchObject({
        name: "Movie",
        description: "other description",
    });
  ```
