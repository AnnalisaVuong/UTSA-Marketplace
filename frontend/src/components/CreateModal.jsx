import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';



export default function BasicModal() {
    
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    image: null,
    name: '',
    description: '',
    tags: '',
    price: ''
  });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, e.g., send data to backend API
    console.log(formData);
    // Reset form data
    setFormData({
      image: null,
      name: '',
      description: '',
      tags: '',
      price: ''
    });
    setOpen(false);
  };
  return (
    <div>
        <Button 
        className="text-white font-inter font-bold py-2 rounded-lg hover:!border-orange-500 hover:text-orange-500" 
        onClick={handleOpen}>
         Create Post
        </Button>
        <Modal
            open={open}
            onClose={handleClose}
        >
            {/* Start of modal */}
        <div className="rounded w-400 bg-white absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center space-between">
          <h1 className="text-4xl font-medium tracking-tight md:text-5xl lg:text-6xl mb-10">
            Create a Post
          </h1>
          <form 
          className='w-full max-w-md'
          onSubmit={handleSubmit}>
                {/* Image submission div */}
                <div className='flex flex-col items-center'>
                    <label className='basis-1/4'>Upload image: </label>
                    <input className='basis-3/4' type="file" accept="image/*" onChange={handleImageChange} />
                </div>
                {/* Name submission div */}
                <div className='flex flex-col items-center'>
                    <label className='basis-2/4'>Name of product: </label>
                    <input 
                    className="basis-2/4" 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    placeholder="Name" 
                    />
                </div>
                {/* Description div */}
                <div>
                    <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
                </div>
                {/* Tags div */}
                <div>
                    <input type="text" name="tags" value={formData.tags} onChange={handleChange} placeholder="Tags" />
                </div>
                {/* Price div */}
                <div>
                    <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" />
                </div>
                {/* Submit button div */}
                <div className='flex flex-row items-center'>
                    <Button 
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