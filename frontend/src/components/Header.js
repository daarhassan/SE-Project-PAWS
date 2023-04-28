import { Link } from "react-router-dom";
import PawsLogo from "../media/images/paws_mini_logo.png";
import { useCart } from "./CartContext";

export default function Header(props) {
    const user = props.user;

    const myCart = useCart();

    return(
        <div className="flex flex-wrap items-center justify-between bg-primary px-6 md:px-10">
            <Link to="/home"><img src={PawsLogo} className="w-[75px]" alt="" /></Link>
            <nav>
                <ul className="md:text-xl font-basetext my-4 md:my-0 flex flex-row space-x-6 md:space-x-10">
                    { user.loggedIn === false?(
                        <>
                            <Link to="/shop"><li>Shop</li></Link>
                            <Link to="/shop/cart"><li>{myCart.itemsCount!==0?(`(${myCart.itemsCount}) `):("")}Cart</li></Link>
                            <Link to="/login"><li>Log-in</li></Link>
                            <Link to="/signup"><li>Sign-up</li></Link>
                        </>
                    ):(
                        <>
                            <Link to="/home"><li>Home</li></Link>
                            <Link to="/shop"><li>Shop</li></Link>
                            <Link to="/shop/cart"><li>{myCart.itemsCount!==0?(`(${myCart.itemsCount}) `):("")}Cart</li></Link>
                            <Link to="/logout"><li>Logout</li></Link>
                        </>
                    )}
                </ul>
            </nav>
        </div>
    )
}