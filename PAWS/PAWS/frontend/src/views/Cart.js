import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { toast } from "react-toastify";
import { useCart } from "../components/CartContext";

// const cartItems = [
//     {
//         id: 1,
//         name: "Cat Food Very healthy and great buy it quickly - 50g",
//         price: 250,
//         quantity: 3
//     },
//     {
//         id: 2,
//         name: "Cat Food Very healthy and great buy it quickly - 50g",
//         price: 350,
//         quantity: 2
//     },
// ];

// localStorage.setItem("cartItems", JSON.stringify(cartItems));

export default function Cart(props) {
    const navigate = useNavigate();
    const myCart = useCart();
    const gotoCheckout = () => {
        if(props.user.loggedIn === false){
            toast.error("Please login to place your order!");
        }
        else{
            navigate("/shop/checkout");
        }
    }

    return(
        <>
            <Header user={props.user} />
            <div className="site-background min-h-[calc(100vh-93px)]">
                <h1 className="font-headtext text-6xl text-center">Shopping Cart</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 py-6 md:px-8 justify-center min-h-[70vh]">
                    <div className="self-start justify-self-center my-4 col-span-2">
                        <div>
                            <table className="table-auto text-left font-basetext min-w-[320px] md:table-fixed max-w-[720px]">
                                <thead>
                                    <tr className="border-b-2 border-secondary">
                                        <th className="p-2 w-[50px]">Item</th>
                                        <th className="p-2"></th>
                                        <th className="p-2 min-w-[100px]">Price</th>
                                        <th className="p-2">Quantity</th>
                                        <th className="p-2 min-w-[100px]">Total</th>
                                        <th className="w-[25px]"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        myCart.cartItems.map((item) => {
                                            return(
                                                <tr key={item.id} className="border-b-2 border-secondary">
                                                    <td className="p-2 w-[50px]"><img src={item.image} alt="" className="w-[50px] h-[50px]" /></td>
                                                    <td className="p-2">{item.name}</td>
                                                    <td className="p-2 text-xl font-headtext">Rs. {item.price}</td>
                                                    <td className="p-2 text-xl font-headtext">{item.quantity}</td>
                                                    <td className="p-2 text-xl font-headtext">Rs. {item.price * item.quantity}</td>
                                                    <td className="p-2 cursor-pointer hover:text-red-600"><p onClick={()=>{myCart.removeItem(item.id)}}>x</p></td>
                                                </tr>
                                            )
                                        })
                                    }
                                    {myCart.cartItems.length === 0 && <tr><td colSpan={6} className="p-2 text-center font-basetext">Your cart is empty!</td></tr>}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="self-end justify-self-center my-4 col-span-1">
                        <div>
                            <table className="table-fixed overflow-auto text-left font-basetext w-[300px]">
                                <tbody>
                                    <tr className="border-b-2 border-secondary">
                                        <td className="p-2 font-bold">Subtotal</td>
                                        <td className="p-2 text-right text-xl font-headtext">Rs. {myCart.totalPrice}</td>
                                    </tr>
                                    <tr className="border-b-2 border-secondary">
                                        <td className="p-2 font-bold">Coupon Code</td>
                                        <td className="p-2 text-right text-xl font-headtext">-</td>
                                    </tr>
                                    <tr className="border-b-2 border-secondary">
                                        <td className="p-2 font-bold">Grand Total</td>
                                        <td className="p-2 text-right text-xl font-headtext">Rs. {myCart.totalPrice}</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>
                                            <button onClick={()=>{gotoCheckout()}} className="block bg-secondary mx-auto border-black border-2 text-xl text-center px-6 py-2 font-headtext m-2 rounded-full hover:bg-secondary/75">Checkout</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}