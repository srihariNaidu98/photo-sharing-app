import React from 'react';


function PhotoGallery({ photos }) {
  return (
    <div className="photo-gallery">
      {photos.map((photo,index) => (
        
        <div key={photo._id} className="photo-item">
          <img className='post_image'  src = {"https://crud-photo-build.onrender.com/" + photo.imagePath} />
        </div>
      ))}
    </div>
  );
}

export default PhotoGallery;
