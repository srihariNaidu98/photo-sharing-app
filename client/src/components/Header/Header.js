import React from "react";
// import icon from ;
// import camera from ;
import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
	return (
		<div id="head">
			<div id="insta">
				<text id="logo">Photo share app</text>
			</div>
			<Link to="/posts/create">
				<img src="/camera.png" id="camera" alt="camera"></img>
			</Link>
		</div>
	);
}

export default Header;
