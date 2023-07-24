import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PhotoGallery from './PhotoGallery';
import PhotoService from '../services/PhotoService';

function UserProfile() {
  const { username } = useParams();
  const [userPhotos, setUserPhotos] = useState([]);

  useEffect(() => {
    // Fetch user's photos from the server using PhotoService
    PhotoService.getPhotosByUsername(username)
      .then((data) => setUserPhotos(data))
      .catch((error) => console.error('Error fetching user photos:', error));
  }, [username]);

  return (
    <div>
      <h2>{username}'s Photos</h2>
      <PhotoGallery photos={userPhotos} />
    </div>
  );
}

export default UserProfile;
