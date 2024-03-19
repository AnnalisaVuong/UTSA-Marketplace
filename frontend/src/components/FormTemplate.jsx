import { useReducer } from "react";

/**
 * @typedef {import("@lib/formTypes").FormAction} FormAction
 * @typedef {import("@lib/formTypes").FormData} FormData
 * @typedef {import("@lib/formTypes").InputType} InputType
 */

/**
 * Reducer: formReducer
 *
 * @description A reducer to be used by the
 * form for updating state.
 *
 * @param {FormData} data
 * @param {FormAction} action
 *
 * @returns {FormData}
 */
function formReducer(data, action) {
  switch (action.type) {
    case "UPDATE":
      return {
        ...data,
        [action.id]: action.input,
      };

    case "RESET":
      const returnObject = new Map();
      for (let key of Object.keys(data)) {
        returnObject.set(key, "");
      }
      return Object.fromEntries(returnObject.entries());
  }
}

/**
 * Function: createReducerObject
 *
 * @description Creates a reducer object from the various reducer arguments
 *
 * @param {Object.<string, InputType>} attributes
 *
 * @returns {FormData}
 */
function createReducerObject(attributes) {
  const mappedObject = Object.keys(attributes).map((key) => [key, undefined]);
  return Object.fromEntries(mappedObject);
}

/**
 * Function: defaultInput
 * @description Determine the default input for the element based on its input type.
 *
 * @param {HTMLInputElement} element
 *
 * @returns {FileList | number | string}
 */
function defaultInput(element) {
  if (element.type === "file") return new FileList();
  else if (element.type === "number" || element.type === "range") return 0;
  else return "";
}

/**
 * Component: FormTemplate
 *
 * @description - A form element that can be created from an object of key value pairs.
 *
 * @param {Object} props
 * @param {Object.<string, InputType>} props.attributes a collection of key-value pairs that will be parsed to create the form.
 * @param {string} props.forwardUrl The URL that the form will send when it is submitted.
 */
export default function FormTemplate({ attributes, forwardUrl }) {
  const [data, dispatch] = useReducer(
    formReducer,
    createReducerObject(attributes),
  );

  function handleSubmit() {
    fetch(forwardUrl, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        // Use a jwt or something like it for storing user session.
        Accept: "application/jwt",
        "Content-Type": "application/json",
      },
    })
      // TODO: Make the response go to a cookie instead of simply logging it.
      .then((res) => res.json())
      .then((obj) => console.log(obj));
  }

  /** @param {React.ChangeEvent<HTMLInputElement>} e */
  function handleChange(e) {
    const { id, value } = e.target;
    const input = value;
    dispatch({
      type: "UPDATE",
      id: id,
      input: input,
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        {Object.values(attributes).map(([field, type]) => (
          <>
            <label htmlFor={field}></label>
            <input
              type={type}
              id={field}
              name={field}
              onChange={handleChange}
              value={data[field]}
            />
          </>
        ))}
        <input type="submit" name="submit" id="submit" value="Submit" />
      </form>
    </>
  );
}
