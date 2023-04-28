import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import { toast } from "react-toastify";
import axiosInstance from "../utils/AxiosJWT";


export default function Shop(props) {
    const params = useParams();
    const user = props.user;
    const orderId = params.orderid;
    const [orderDetails, setOrderDetails] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await axiosInstance.get(`order/${orderId}`);
                console.log(response.data);
                setOrderDetails(response.data.order || {});
                setLoading(false);
            } catch (error) {
                console.log(error);
                toast.error("Failed to fetch order.");
                setLoading(false);
            }
        }
        fetchOrder();
        // eslint-disable-next-line
    }, []);

    return(
        <>
            <Header user={props.user} />
            <div className="site-background min-h-[calc(100vh-90px)] px-4">
                <h1 className="font-headtext text-6xl text-center">Order Details</h1><br/><br/>
                {
                    loading?(
                        <h1 className="text-2xl font-basetext text-center mx-auto my-4 mt-12">Loading Order ...</h1>
                    ):(
                        <div className="grid grid-cols-1 bg-secondary rounded-xl mx-auto max-w-[800px] md:grid-cols-2 p-4 justify-center">
                            <div className="self-start justify-self-start my-4 py-2 px-6">
                                <div>
                                    <h1 className="font-headtext text-4xl underline">Order Summary</h1>
                                    <table className="table-auto w-full font-basetext my-4">
                                        <tbody>
                                            {
                                                orderDetails?.products?.map((product) => {
                                                    return(
                                                        <tr key={product._id} className="border-b-2 border-primary">
                                                            <td className="p-2 w-[50px]"><img src={product.product.image} alt="" className="w-[50px] h-[50px]" /></td>
                                                            <td className="p-2">{product.product.name}</td>
                                                            <td className="p-2">x{product.quantity}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                    <div className="block font-basetext text-center mx-auto my-2">
                                        <p><b>Grand Total:</b> {orderDetails?.totalAmount}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="self-start justify-self-start my-4 py-2 px-6">
                                <div>
                                    <h1 className="font-headtext text-4xl underline">Shipping Details</h1>
                                    <div className="mx-2 my-4">
                                        <p className="font-basetext font-semibold">{user.name}</p>
                                        <p className="font-basetext">{orderDetails?.address}</p>
                                        <p className="font-basetext">{orderDetails?.city}, {orderDetails?.country}</p>
                                        <p className="font-basetext">{user.email}</p>
                                        <br/>
                                        <p className="font-basetext"><b>Payment Method:</b> {orderDetails?.paymentMethod}</p>
                                        <p className="font-basetext"><b>Order Number:</b> {orderId}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
                <br/><br/>
                <Link to="/shop"><button className="block mx-auto text-xl px-6 py-2 font-basetext bg-secondary rounded-full hover:bg-secondary/75">Continue Shopping</button></Link>
                <br/><br/>
            </div>
        </>
    );
}