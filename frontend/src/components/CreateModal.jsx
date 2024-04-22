import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useFormState } from "@hooks/formHooks";
import CurrencyInput from 'react-currency-input-field';
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
        <div className="p-5 rounded w-400 bg-white absolute left-1/2 top-1/2 transform 
                        -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center space-between">
          <h1 className="font-mono text-[#0c2340] text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl mb-10">
            Create a Post
          </h1>
          <form
            className="w-full max-w-md"
            onSubmit={() => console.log(formData)}
          >
            {/* Image submission div */}
            <div className="flex flex-col">
              <label className="text-[#f15a22] text-lg">Upload image: </label>
              <input
                required
                className="font-medium"
                type="file"
                accept="image/*"
                onChange={setFormData}
              />
            </div>
            {/* Name submission div */}
            <div className="flex flex-col">
              <label className="text-[#f15a22] text-lg">Name of product: </label>
              <input
                required
                className="font-medium"
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={setFormData}
                placeholder="Name"
              />
            </div>
            {/* Description div */}
            <div className="flex flex-col">
              <label className="text-[#f15a22] text-lg">Description: </label>
              <textarea
                required
                className="font-medium"
                name="description"
                id="description"
                value={formData.description}
                onChange={setFormData}
                placeholder="Short description of product"
              />
            </div>
            {/* Price div */}
            <div className="flex flex-col">
              
              <label className="text-[#f15a22] text-lg">Price in USD:</label>
              <CurrencyInput
                required
                className="font-medium"
                prefix="$"
                id="price"
                name="price"
                placeholder="$1234.56"
                decimalsLimit={2}
                value={formData.price}
                //onChange
                onValueChange={(value, name, values) => console.log(value, name, values)}
              />
            </div>
            {/* Submit button div */}
            <div className="flex flex-row items-center justify-center">
              <Button 
              className="font-bold text-[#0c2340] text-xl hover:bg-[#f15a22]"
              type="submit">
                Submit
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
