/* This file consists of some defined types
 * that will be used with the landing page */

/**
 * @description A type that will define the callback function for the useFormState hook
 * @typedef {(event: React.FormEvent<HTMLFormElement>, callback?: (res: Response | undefined) => void | undefined) => Promise<void>} SubmissionCallback
 */

/**
 * @description An object that the api returns when there is an error.
 *
 * @typedef {Object} BackendResponseError
 * @property {string} message
 * @property {Error} error
 * @property {number} status
 */

/** @typedef {BackendResponseError & Response} BackendError */

/**
 * @typedef {Object} BackendResponseJWT
 * @property {string} token
 */

/** @typedef {BackendResponseJWT & Response} JWTResponse */

/** @typedef {(BackendResponseError | BackendResponseJWT) & Response} BackendResponseOption */
export default {};
