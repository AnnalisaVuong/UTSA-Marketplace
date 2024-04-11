import { useState } from "react";

/**
 * Hook: useFormState()
 *
 * @description This function takes a url and sets up state for form handling.
 *
 * @param {URL} url - Url to the site that the form will be sent to.
 *
 * @returns {[React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>, React.FormEventHandler<HTMLFormElement>, any]} - A function to set the form data to be attached as an event listener
 *
 * @example
 * export default function FormComponentExample() {
 *    const [setFormData, onSubmit, formState] = useFormState("http://localhost:80");
 *
 *    // setFormData will create a key with the id of the input, make sure that one is defined.
 *    return(
 *      <form onSubmit={onSubmit}>
 *        <input onChange={setFormData} id="form-name"/> // <-- id attribute must be defined.
 *        <input onChange={setFormData} id="some-other-name"/>
 *        <input type="submit"/>
 *      </form>
 *    );
 * }
 *
 * // can also be called like this if you want to control the Response yourself.
 *      <form onSubmit={(e) => onSubmit(e, async (res) => console.log(await res.json()))}>
 */
export function useFormState(url) {
  const [formState, setFormState] = useState({});

  /** @param {React.ChangeEvent<HTMLInputElement>} event */
  const setFormData = (event) => {
    const snakeCaseName = event.target.id.replace("-", "_");
    setFormState({
      ...formState,
      [snakeCaseName]: event.target.value,
    });
  };

  /**
   * Function: submit
   *
   * @description A function to be called when the form is submitted.
   *
   * @param {React.FormEvent<HTMLFormElement>} event - Event to respond to
   * @param {(res: Response | undefined) => void} [callback] - Callback to execute with the response from the backend.
   *
   * @returns {Promise<void>}
   * */
  const submit = async (event, callback) => {
    event.preventDefault();

    const formDataString = JSON.stringify(formState);

    const extraHeaders = new Headers();
    extraHeaders.append("Accept", "application/json");
    extraHeaders.append("Content-Type", "application/json");

    const res = await fetch(url, {
      method: "POST",
      headers: extraHeaders,
      body: formDataString,
    });

    if (!callback) {
      console.log(await res.json());
      return;
    }

    callback(res);
  };

  return [setFormData, submit, formState];
}
