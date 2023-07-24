import React, { useState } from "react";
import "./UploadPost.css";
import Header from "../Header/Header";
import { useHistory } from "react-router-dom";
import PhotoService from '../../services/PhotoService'

function UploadPost() {
	const [name, setName] = useState("");
	const [filename, setFileName] = useState("");
	const [location, setLocation] = useState("");
	const [image, setImage] = useState(null);
	const history = useHistory();

	const ChangeName = (e) => {
		setName(e.target.value);
	};

	const ChangeLocation = (e) => {
		setLocation(e.target.value);
	};

	const changeImageChange = (e) => {
		setFileName(e.target.files[0].name);
		setImage(e.target.files[0]);
	  };

	const postDetails = async (e) => {
		console.log("clicked");
		const formData = new FormData();
		formData.append('name', name);
		formData.append('tag', location);
		formData.append('image', image);
	
		// Upload the photo to the server using PhotoService
		PhotoService.uploadPhoto(formData)
		  .then((data) => console.log('Photo uploaded successfully:', data))
		  .catch((error) => console.error('Error uploading photo:', error));
	};

	const navigate = async (e) => {
		history.push("/posts");
	};

	return (
		<div>
			<Header />
			<div className="display">
				{/* <form action="/upload" method="post" encType="multipart/form-data"> */}
				<div className="imageurl">
					<input className="text" placeholder="Choose file" value={filename} />
					<input
						type="file"
						className="browse"
						name="image"
						id="image"
						onChange={changeImageChange}
						hidden
					/>
					<label className="Filelabel" htmlFor="image">
						Browse
					</label>
				</div>

				<div className="middle">
					<input
						className="text1"
						placeholder="name"
						name="name"
						onChange={ChangeName}
					/>
					<input
						className="text2"
						placeholder="location"
						name="location"
						onChange={ChangeLocation}
					/>
				</div>
				<div className="Activepost">
					<button
						type="submit"
						onClick={() => {
							postDetails();
							navigate();
						}}
						className={
							name !== "" &&
							location !== "" &&
							filename !== ""
								? "Activepostbutton"
								: "postbutton"
						}
					>
						Post
					</button>
				</div>


				{/* </form> */}
			</div>
		</div>
	);
}

export default UploadPost;
