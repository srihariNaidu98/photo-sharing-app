import React, { useEffect, useState } from 'react';
import PhotoGallery from './PhotoGallery';
import PhotoService from '../services/PhotoService';

function Home() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    // Fetch photos from the server using PhotoService
    PhotoService.getPhotos()
      .then((data) => setPhotos(data))
      .catch((error) => console.error('Error fetching photos:', error));
  }, []);

  return (
    <div>
      <h2>Recent Photos</h2>
      <PhotoGallery photos={photos} />
    </div>
  );
}

export default Home;