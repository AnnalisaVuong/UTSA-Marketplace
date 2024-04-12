import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useFormState } from "@hooks/formHooks";
const BACKEND_URL = "http://localhost:5000";

/**
 * Component BasicModal:
 *
 * @param {Object} props
 * @param {boolean} props.shown
 * @param {() => void} props.onClose
 *
 */
export default function BasicModal({ shown, onClose }) {
  const [setFormData, submitForm, formData] = useFormState(
    new URL(BACKEND_URL + "/listings/create"),
  );

  return (
    <div>
      <Modal open={shown} onClose={onClose}>
        <div className="rounded w-400 bg-white absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center space-between">
          <h1 className="text-4xl font-medium tracking-tight md:text-5xl lg:text-6xl mb-10">
            Create a Post
          </h1>
          <form
            className="w-full max-w-md"
            onSubmit={() => console.log(formData)}
          >
            {/* Image submission div */}
            <div className="flex flex-col items-center">
              <label className="basis-1/4">Upload image: </label>
              <input
                className="basis-3/4"
                type="file"
                accept="image/*"
                onChange={setFormData}
              />
            </div>
            {/* Name submission div */}
            <div className="flex flex-col items-center">
              <label className="basis-2/4">Name of product: </label>
              <input
                className="basis-2/4"
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={setFormData}
                placeholder="Name"
              />
            </div>
            {/* Description div */}
            <div>
              <textarea
                name="description"
                id="description"
                value={formData.description}
                onChange={setFormData}
                placeholder="Description"
              />
            </div>
            {/* Tags div */}
            <div>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={setFormData}
                placeholder="Tags"
              />
            </div>
            {/* Price div */}
            <div>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={setFormData}
                placeholder="Price"
              />
            </div>
            {/* Submit button div */}
            <div className="flex flex-row items-center">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
