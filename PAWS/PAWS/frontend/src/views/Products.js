import { useParams } from "react-router-dom";
import Header from "../components/Header";
import axiosInstance from "../utils/AxiosJWT";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useCart } from "../components/CartContext";


export default function Products(props) {
    const params = useParams();
    const myCart = useCart();
    const animal = params.animal;
    const category = params.category;
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    // Add product to cart
    const addToCart = (product) => {
        product.id = product._id;
        product.quantity = 1;
        myCart.addItem(product);
        toast.success("Added to cart.");
    }
    // fetch products from database
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axiosInstance.get(`product/${animal}/${category}`);
                console.log(response.data);
                setProducts(response.data.products || []);
                setLoading(false);
            } catch (error) {
                console.log(error);
                toast.error("Failed to fetch products.");
                setLoading(false);
            }
        }
        fetchProducts();
        // eslint-disable-next-line
    }, []);
    return(
        <>
            <Header user={props.user} />
            <div className="site-background min-h-[calc(100vh-90px)]">
                <h1 className="font-headtext text-6xl text-center">{animal.charAt(0).toUpperCase() + animal.slice(1, -1)} {category.charAt(0).toUpperCase() + category.slice(1)}</h1>
                {
                    loading?(
                        <h1 className="text-2xl font-basetext text-center mx-auto my-4 mt-12">Loading Products ...</h1>
                    ):(
                        products.length === 0?(
                            <h1 className="text-2xl font-basetext text-center mx-auto my-4 mt-12">No products found.</h1>
                        ):("")
                    )
                }
                <br/>
                <div className="flex overflow-x-auto mx-auto font-basetext w-3/4 py-6 md:px-8">
                    {
                        products.map((product) => {
                            return(
                                <div key={product._id} className="flex-shrink-0 w-[280px] mx-2">
                                    <div className="border-2 border-black rounded-xl bg-secondary py-4 px-6">
                                        <img src={product.image} className="block mx-auto my-2 w-[150px] h-[150px]" alt="" />
                                        <h1 className="py-0.5 text-xl font-headtext overflow-hidden whitespace-nowrap text-ellipsis">{product.name}</h1>
                                        <h1 className="py-0.5 text-xl font-headtext">Rating {product.rating}/5</h1>
                                        <h1 className="py-0.5 text-xl font-headtext">Rs. {product.price}</h1>
                                        <h1 className="py-0.5 text-xl font-headtext">{product.inventory} left in stock</h1>
                                    </div>
                                    <button onClick={() => {addToCart(product)}} className="block bg-secondary rounded-full px-4 py-2 font-basetext mx-auto mt-4 hover:bg-secondary/75">Add to Cart</button>
                                </div>
                            )
                        })
                    }
                    {/* <div className="flex-shrink-0 w-[280px] mx-2">
                        <div className="border-2 border-black rounded-xl w-[] bg-secondary py-4 px-6">
                            <img src={CatImg} className="block mx-auto w-[150px] h-[150px]" alt="" />
                            <h1 className="py-1 overflow-hidden whitespace-nowrap text-ellipsis">Imported Cat Food - 50g</h1>
                            <h1 className="py-1 text-xl font-headtext">Rating 4/5</h1>
                            <h1 className="py-1 text-xl font-headtext">Rs. 100</h1>
                            <h1 className="py-1 text-xl font-headtext">120 left in stock</h1>
                        </div>
                        <button className="block bg-secondary rounded-full px-4 py-2 font-basetext mx-auto mt-4 hover:bg-secondary/75">Add to Cart</button>
                    </div>
                    <div className="flex-shrink-0 w-[280px] mx-2">
                        <div className="border-2 border-black rounded-xl w-[] bg-secondary py-4 px-6">
                            <img src={CatImg} className="block mx-auto w-[150px] h-[150px]" alt="" />
                            <h1 title="Imported Cat From USA Netherlands Food - 50g" className="py-1 overflow-hidden whitespace-nowrap text-ellipsis">Imported Cat From USA Netherlands Food - 50g</h1>
                            <h1 className="py-1 text-xl font-headtext">Rating 4/5</h1>
                            <h1 className="py-1 text-xl font-headtext">Rs. 100</h1>
                            <h1 className="py-1 text-xl font-headtext">120 left in stock</h1>
                        </div>
                        <button className="block bg-secondary rounded-full px-4 py-2 font-basetext mx-auto mt-4 hover:bg-secondary/75">Add to Cart</button>
                    </div>
                    <div className="flex-shrink-0 w-[280px] mx-2">
                        <div className="border-2 border-black rounded-xl w-[] bg-secondary py-4 px-6">
                            <img src={CatImg} className="block mx-auto w-[150px] h-[150px]" alt="" />
                            <h1 className="py-1">Imported Cat Food - 50g</h1>
                            <h1 className="py-1 text-xl font-headtext">Rating 4/5</h1>
                            <h1 className="py-1 text-xl font-headtext">Rs. 100</h1>
                            <h1 className="py-1 text-xl font-headtext">120 left in stock</h1>
                        </div>
                        <button className="block bg-secondary rounded-full px-4 py-2 font-basetext mx-auto mt-4 hover:bg-secondary/75">Add to Cart</button>
                    </div>
                    <div className="flex-shrink-0 w-[280px] mx-2">
                        <div className="border-2 border-black rounded-xl w-[] bg-secondary py-4 px-6">
                            <img src={CatImg} className="block mx-auto w-[150px] h-[150px]" alt="" />
                            <h1 className="py-1">Imported Cat Food - 50g</h1>
                            <h1 className="py-1 text-xl font-headtext">Rating 4/5</h1>
                            <h1 className="py-1 text-xl font-headtext">Rs. 100</h1>
                            <h1 className="py-1 text-xl font-headtext">120 left in stock</h1>
                        </div>
                        <button className="block bg-secondary rounded-full px-4 py-2 font-basetext mx-auto mt-4 hover:bg-secondary/75">Add to Cart</button>
                    </div>
                    <div className="flex-shrink-0 w-[280px] mx-2">
                        <div className="border-2 border-black rounded-xl w-[] bg-secondary py-4 px-6">
                            <img src={CatImg} className="block mx-auto w-[150px] h-[150px]" alt="" />
                            <h1 className="py-1">Imported Cat Food - 50g</h1>
                            <h1 className="py-1 text-xl font-headtext">Rating 4/5</h1>
                            <h1 className="py-1 text-xl font-headtext">Rs. 100</h1>
                            <h1 className="py-1 text-xl font-headtext">120 left in stock</h1>
                        </div>
                        <button className="block bg-secondary rounded-full px-4 py-2 font-basetext mx-auto mt-4 hover:bg-secondary/75">Add to Cart</button>
                    </div> */}
                </div>
            </div>
        </>
    )
}