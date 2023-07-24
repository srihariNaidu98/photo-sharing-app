import React, { useState } from "react";
import "./Post.css";
import heart from './heart.png'
import PhotoService from '../../services/PhotoService'

function Post({ name,tag,imagePath,date,likes,id}) {
	const [message, setMessage] = useState("");

	const ChangeMessage = (e) => {
		setMessage(e.target.value);
	};

	const likesbutton= async (e)=>{
		PhotoService.likePost(id)
		.then((data) => console.log('post liked succesfully:', data))
		.catch((error) => console.error('Error liking photo:', error));
    }

	const subMitMessages =async (e)=>{

		PhotoService.commentPost(id,{'message': [message],'id':id})
		.then((data) => console.log('comment uploaded successfully:', data))
		.catch((error) => console.error('Error commenting photo:', error));
	}
	return (
		<div className="">
			<div className="post">
				<div className="post__header">
					{/* {header--> username + location + moreIcon} */}
					<div className="post__headerInfo">
						<h3>{name}</h3>
						<p>{tag}</p>
					</div>

					<img
						className="post__headerMoreIcon"
						src="/moreIcon.png"
						alt="moreIcon"
					/>
				</div>
				{/* {postBody--> Image} */}
				<img className='post_image'  src = {"http://localhost:8000/" + imagePath} />
				<div className="post__footer">

					<div className="post__footerUpper">
						<div className="post__footerUpper-Icons">
						<div className='postpage_heartshare'>
                <button className='heartbutton'><img className='postpage_heart' src={heart} alt="my image" onClick={likesbutton}/></button>
            
            </div>

						</div>
						{date}
					</div>


				</div>
				<div className="post__header">
					{/* {header--> username + location + moreIcon} */}
					<div className="post__headerInfo">
					<p className='postpage_likes' >{likes} likes</p>
					</div>

				</div>
				<input
						className="text1"
						placeholder="comment"
						name="comment"
						onChange={ChangeMessage}

					/>
					<button onClick={subMitMessages}>Submit</button>

			</div>
		</div>
	);
}

export default Post;
