// import { writable } from "svelte/store";
import { tweened } from "svelte/motion";

/* Data that needs to be shared across components will be stored here */

/* Using the height of an element as a store for animations */
export const dropdownHeight = tweened(0, {
  duration: 200,
});
