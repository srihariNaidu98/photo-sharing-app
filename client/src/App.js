import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Link,
	Redirect,
} from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import UploadPost from "./components/UploadPost/UploadPost";
import InstagramPage from "./components/InstagramPage/InstagramPage";


function App() { 
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={HomePage} />
				<Route exact path ="/posts/create" component = {UploadPost}/>
				<Route exact path="/posts" component={InstagramPage} />
			</Switch>
		</Router>
	);
}

export default App;