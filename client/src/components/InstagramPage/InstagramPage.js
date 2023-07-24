import React, { useState, useEffect } from "react";
import "./InstagramPage.css";
import Post from "../Post/Post";
import Header from "../Header/Header";
import PhotoService from '../../services/PhotoService'
import moment from 'moment'

function InstagramPage() {
	const [photos, setPhotos] = useState([]);
	const [name, setName] = useState('');
	const [location, setLocation] = useState('');

	const handleNameChange = (e) => {
		setName(e.target.value);
	  };
	
	  const handleLocationChange = (e) => {
		setLocation(e.target.value);
	  };
	
	  const handleFilterSubmit = (e) => {
		let query={}
		if(name!==''){
			query={...query,'name':name}

		}
		if(location!==''){
			query={...query,'tags':[location]}

		}

		PhotoService.getPhotos(query)
		.then((data) => setPhotos(data))
		.catch((error) => console.error('Error fetching photos:', error));
	  };

	useEffect(() => {
		let query={}
		if(!name && name!==''){
			query={...query,'name':name}

		}
		if(!location && location!==''){
			query={...query,'tags':[location]}

		}

		PhotoService.getPhotos(query)
		.then((data) => setPhotos(data))
		.catch((error) => console.error('Error fetching photos:', error));
	// eslint-disable-next-line
	}, []);

	let postarray = [...photos].reverse();
	return (
		<div>
			<Header />

			<div className="InstaPagePosts">

			<div className="searchPost">
      <label>Search:</label>
      <input type="text" placeholder='Name' value={name} onChange={handleNameChange} />

      <label>Tag:</label>
      <input type="text" placeholder='Tag' value={location} onChange={handleLocationChange} />
	  <button onClick={handleFilterSubmit}>Apply Filters</button>

    </div>
				{postarray.map((post,index) => (
					<Post
						name={post.name}
						tag={post.tag}
						imagePath={post.imagePath}
						likes={post.likes}
						date={moment(post.creatdAt).format('DD-MM-yyyy')}
						key={index}
						id={post._id}
					/>
				))}
				<h3>
					<i>Create Post</i>
				</h3>
			</div>
		</div>
	);
}
export default InstagramPage;
