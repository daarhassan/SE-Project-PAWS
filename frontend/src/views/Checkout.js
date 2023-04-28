import Header from "../components/Header";
import { useEffect, useState } from "react";
import { useCart } from "../components/CartContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/AxiosJWT";

export default function Checkout(props) {
    const user = props.user;
    const navigate = useNavigate();
    const myCart = useCart();
    const firstName = user.name.split(" ").length >= 2?user.name.split(" ")[0]:user.name;
    const lastName = user.name.split(" ").length >= 2?user.name.split(" ")[1]:user.name;
    const [address, setAddress] = useState(user.address);
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [loading, setLoading] = useState(false);
    const verifyCheckout = () => {
        if(myCart.itemsCount === 0){
            toast.error("Your cart is empty.");
            return false;
        }
        if(address === "" || city === "" || country === ""){
            toast.error("Please fill all the fields.");
            return false;
        }
        return true;
    };
    const placeOrder = () => {
        setLoading(true);
        if(!verifyCheckout()){
            setLoading(false);
            return;
        }
        // create object 
        axiosInstance.post("order", {
            address: address,
            city: city,
            country: country,
            products: myCart.cartItems
        }).then((response) => {
            console.log(response.data);
            myCart.clearCart();
            setLoading(false);
            navigate(`/order/${response.data.orderId}`);
        }).catch((error) => {
            console.log(error);
            toast.error("Failed to place order.");
            setLoading(false);
        });
    }
    useEffect(() => {
        if(user.loggedIn === false){
            navigate("/login");
        }
        // eslint-disable-next-line
    }, []);

    return(
        <>
            <Header user={props.user} />
            <div className="site-background min-h-[calc(100vh-90px)] px-4">
                <h1 className="font-headtext text-6xl text-center">Checkout</h1><br/><br/>
                <div className="grid grid-cols-1 mx-auto max-w-[800px] p-4 justify-center">
                    <div className="self-start justify-self-center my-4 py-2 px-6">
                        <div>
                            <h1 className="font-headtext text-4xl underline">Shipping Details</h1>
                            <div>
                                <div className="block my-2">
                                    <input placeholder="First Name" value={firstName} className="rounded-full mr-1 w-[165px] font-basetext outline-none ring-0 px-4 py-2 mx-auto my-4 bg-secondary placeholder:text-amber-900 cursor-not-allowed placeholder:font-basetext" type="text" disabled />
                                    <input placeholder="Last Name" value={lastName} className="rounded-full ml-1 w-[165px] font-basetext outline-none ring-0 px-4 py-2 mx-auto my-4 bg-secondary placeholder:text-amber-900 cursor-not-allowed placeholder:font-basetext" type="text" disabled />
                                </div>
                                <div className="block my-2">
                                    <input id="emailInp" placeholder="Email" value={user.email} className="rounded-full w-[340px] font-basetext outline-none ring-0 px-4 py-2 mx-auto my-4 bg-secondary placeholder:text-amber-900 cursor-not-allowed placeholder:font-basetext" type="email" disabled />
                                </div>
                                <div className="block my-2">
                                    <input id="addressInp" placeholder="Address" onChange={(e)=>{setAddress(e.target.value)}} value={address} className="rounded-full w-[340px] font-basetext outline-none ring-0 px-4 py-2 mx-auto my-4 bg-secondary placeholder:text-amber-900 placeholder:font-basetext" type="text" />
                                </div>
                                <div className="block my-2">
                                    <input placeholder="City" onChange={(e)=>{setCity(e.target.value)}} value={city} className="rounded-full mr-1 w-[165px] font-basetext outline-none ring-0 px-4 py-2 mx-auto my-4 bg-secondary placeholder:text-amber-900 placeholder:font-basetext" type="text" />
                                    <input placeholder="Country" onChange={(e)=>{setCountry(e.target.value)}} value={country} className="rounded-full ml-1 w-[165px] font-basetext outline-none ring-0 px-4 py-2 mx-auto my-4 bg-secondary placeholder:text-amber-900 placeholder:font-basetext" type="text" />
                                </div>
                            </div>
                            <h1 className="font-headtext text-4xl underline">Payment Method</h1>
                            <ul className="m-4 font-basetext list-disc list-inside">
                                <li>Cash on Delivery</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <button onClick={()=>{placeOrder()}} className="block mx-auto text-xl px-6 py-2 font-basetext bg-secondary rounded-full hover:bg-secondary/75" disabled={loading}>{loading?("Loading ..."):("Place Order")}</button>
                <br/><br/>
            </div>
        </>
    );
}