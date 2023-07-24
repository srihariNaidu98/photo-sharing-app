// Sample PhotoService.js for handling HTTP requests (assuming you have a backend API)
const BASE_URL = 'https://crud-photo-build.onrender.com/posts';

const PhotoService = {
  getPhotos: async (filters) => {
    const response = await fetch(`${BASE_URL}/list`,{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(filters)
    });
    const data = await response.json();
    return data;
  },

  getPhotoById: async (id) => {
    const response = await fetch(`${BASE_URL}/view/${id}`);
    const data = await response.json();
    return data;
  },

  getPhotosByUsername: async (username) => {
    const response = await fetch(`${BASE_URL}/user/${username}`);
    const data = await response.json();
    return data;
  },

  uploadPhoto: async (formData) => {
    const response = await fetch(`${BASE_URL}/upload`, {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    return data;
  },

  likePost: async (id)=>{
    const response = await fetch(`${BASE_URL}/like/${id}`, {
      method: 'PUT',
      body: {},
    });
    const data = await response.json();
    return data;    
  },

  commentPost: async (id,formData)=>{
    console.log(formData,"formData")
    const response = await fetch(`${BASE_URL}/message/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const data = await response.json();
    return data; 
  }
};

export default PhotoService;
