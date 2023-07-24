import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PhotoService from '../services/PhotoService';

function PhotoDetail() {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    // Fetch the photo details from the server using PhotoService
    PhotoService.getPhotoById(id)
      .then((data) => setPhoto(data))
      .catch((error) => console.error('Error fetching photo details:', error));
  }, [id]);

  if (!photo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{photo.title}</h2>
      <img src={photo.url} alt={photo.title} />
      <p>{photo.description}</p>
      {/* Add LikeButton and Comment components here */}
    </div>
  );
}

export default PhotoDetail;
