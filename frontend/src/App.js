import React from "react";
import { Routes, Route } from 'react-router-dom';
import Home from "./views/Home";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Logout from "./components/Logout";
import Shop from "./views/Shop";
import Cart from "./views/Cart";
import Checkout from "./views/Checkout";
import OrderDetails from "./views/OrderDetails";
import UserProfile from "./utils/UserProfile";
import Products from "./views/Products";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from "./components/Loading";
import { CartProvider } from "./components/CartContext";


class App extends React.Component {
	constructor(props) 
	{
		super(props);
		this.state = {
		  	initialized: false,
			user: null,
		};
	}
    hideLoader()
	{
		const loader = document.querySelector('#loader');
		loader.classList.add('hide');
	}
	async componentDidMount()
	{
		// Removing the Loading Div
		this.hideLoader();
		// Initializing the User Profile
		const userObj = await UserProfile.initialize();
		console.log(userObj);
		this.setState({
			initialized: true,
			user: userObj,
		});
		// console.log(this.state.)
	}
  	render() 
  	{
		if(this.state.initialized)
		{
			return(
				<main>
					<CartProvider>
						<Routes>
							{/* Route(s) for home/landing page */}
							<Route exact path="/" element={<Home user={this.state.user} />} />
							<Route exact path="/home" element={<Home user={this.state.user}  />} />
							{/* Route(s) for account pages */}
							<Route exact path="/login" element={<Login user={this.state.user} />} />
							<Route exact path="/signup" element={<Signup user={this.state.user} />} />
							<Route exact path="/logout" element={<Logout />} />
							{/* Route(s) for E-Commerce Pages */}
							<Route exact path="/shop" element={<Shop user={this.state.user} />} />
							<Route exact path="/shop/cart" element={<Cart user={this.state.user} />} />
							<Route exact path="/shop/checkout" element={<Checkout user={this.state.user} />} />
							<Route exact path="/shop/:animal" element={<Shop user={this.state.user} />} />
							<Route exact path="/shop/:animal/:category" element={<Products user={this.state.user} />} />
							<Route exact path="/order/:orderid" element={<OrderDetails user={this.state.user} />} />
							{/* Route(s) 404 Error */}
							{/* <Route path="*" element={<NotFound />} /> */}
						</Routes>
						<ToastContainer position="top-right" theme="colored" autoClose={5000} hideProgressBar={false} newestOnTop={true} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
					</CartProvider>
				</main>
			);
		}
		else
		{
			return(
				<main>
					<Loading />
				</main>
			);
		}
  	}
};

export default App;

// -------------------------------------------------------------------------
// Local Storage Items:
// 
// auth		=>	Authorization token which is used to get the access token. 
// 				This token remains valid for 24 hours since it's issue time. 
// 				It also gets re-generated after every verification request.
// 
// access	=>	This token is valid for 1 hour. It's obtained using the "auth" token. 
// 
// redirect	=>	This is the redirect url
// -------------------------------------------------------------------------