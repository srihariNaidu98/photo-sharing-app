import React, { useState } from 'react';
import PhotoService from '../services/PhotoService';

function UploadPhoto() {
  const [name, setName] = useState('');
  const [tag, setTag] = useState('');
  const [image, setImage] = useState(null);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleTagChange = (e) => {
    setTag(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare photo data to upload
    const formData = new FormData();
    formData.append('name', name);
    formData.append('tag', tag);
    formData.append('image', image);

    // Upload the photo to the server using PhotoService
    PhotoService.uploadPhoto(formData)
      .then((data) => console.log('Photo uploaded successfully:', data))
      .catch((error) => console.error('Error uploading photo:', error));

    // Reset form fields after successful upload (you may redirect to another page)
    setName('');
    setTag('');
    setImage(null);
  };

  return (
    <div>
      <h2>Upload Photo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name} onChange={handleNameChange} />
        </div>
        <div>
          <label htmlFor="tag">Tag:</label>
          <textarea id="tag" value={tag} onChange={handleTagChange} />
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input type="file" id="image" onChange={handleImageChange} />
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default UploadPhoto;
