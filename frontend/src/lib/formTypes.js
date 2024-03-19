/* Form Types to be used with the application. */

/**
 * Represents the type attribute of an HTML input element.
 * @typedef { "button"
 * | "checkbox"
 * | "color"
 * | "date"
 * | "datetime-local"
 * | "email"
 * | "file"
 * | "hidden"
 * | "image"
 * | "month"
 * | "number"
 * | "password"
 * | "radio"
 * | "range"
 * | "reset"
 * | "search"
 * | "submit"
 * | "tel"
 * | "text"
 * | "time"
 * | "url"
 * | "week"} InputType
 */

/**
 * @typedef {Object.<string, string | number | readonly string[] | undefined>} FormData
 *
 * @description - The form data to be tracked by the formReducer function.
 */

/**
 * @typedef {Object} FormAction
 *
 * @property {"UPDATE" | "RESET"} type - The type of action that is being sent.
 * @property {string} id - The id of the form element being acted upon.
 * @property {string} input - The input of data that is coming from the input element.
 * @property {string} type - The type of the input element.
 */

export {};
