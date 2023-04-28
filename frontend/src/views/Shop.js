import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import CatImg from "../media/images/cat_image.png";
import DogImg from "../media/images/dog_image.png";
import CatFoodImg from "../media/images/cat_food_image.png";
import CatAccessoryImg from "../media/images/cat_accessory_image.png";
import CatToyImg from "../media/images/cat_toy_image.png";
import DogFoodImg from "../media/images/dog_food_image.png";
import DogAccessoryImg from "../media/images/dog_accessory_image.png";
import DogToyImg from "../media/images/dog_toy_image.png";

export default function Shop(props) {
    const params = useParams();
    return(
        <>
            <Header user={props.user} />
            <div className="site-background min-h-[calc(100vh-93px)]">
                <h1 className="font-headtext text-6xl text-center">{params.animal==="cats"?("Cat Products"):(params.animal==="dogs"?("Dog Products"):("Shop"))}</h1>
                {params.animal === undefined && <div className="grid grid-cols-1 md:grid-cols-2 py-6 md:px-8 justify-center">
                    <div className="self-center justify-self-center my-4">
                        <div>
                            <img src={CatImg} alt="" className="w-[250px] my-4" />
                            <Link to="/shop/cats"><p className="text-center text-xl p-2 font-basetext bg-secondary rounded-full hover:bg-secondary/75">Cats</p></Link>
                        </div>
                    </div>
                    <div className="self-center justify-self-center my-4">
                        <div>
                            <img src={DogImg} alt="" className="w-[250px] my-4" />
                            <Link to="/shop/dogs"><p className="text-center text-xl p-2 font-basetext bg-secondary rounded-full hover:bg-secondary/75">Dogs</p></Link>
                        </div>
                    </div>
                </div>}
                {params.animal === "cats" && <div className="grid grid-cols-1 md:grid-cols-3 py-6 md:px-8 justify-center">
                    <div className="self-center justify-self-center my-4">
                        <div>
                            <div className="my-4 p-10 bg-alternative rounded-2xl"><img src={CatFoodImg} alt="" className="w-[120px]" /></div>
                            <Link to="/shop/cats/foods"><p className="text-center text-xl p-2 font-basetext bg-secondary rounded-full hover:bg-secondary/75">Cat Food</p></Link>
                        </div>
                    </div>
                    <div className="self-center justify-self-center my-4">
                        <div>
                            <div className="my-4 p-10 bg-alternative rounded-2xl"><img src={CatAccessoryImg} alt="" className="w-[120px]" /></div>
                            <Link to="/shop/cats/accessories"><p className="text-center text-xl p-2 font-basetext bg-secondary rounded-full hover:bg-secondary/75">Cat Accessories</p></Link>
                        </div>
                    </div>
                    <div className="self-center justify-self-center my-4">
                        <div>
                            <div className="my-4 p-10 bg-alternative rounded-2xl"><img src={CatToyImg} alt="" className="w-[120px]" /></div>
                            <Link to="/shop/cats/toys"><p className="text-center text-xl p-2 font-basetext bg-secondary rounded-full hover:bg-secondary/75">Cat Toys</p></Link>
                        </div>
                    </div>
                </div>}
                {params.animal === "dogs" && <div className="grid grid-cols-1 md:grid-cols-3 py-6 md:px-8 justify-center">
                    <div className="self-center justify-self-center my-4">
                        <div>
                            <div className="my-4 p-10 bg-alternative rounded-2xl"><img src={DogFoodImg} alt="" className="w-[120px]" /></div>
                            <Link to="/shop/dogs/foods"><p className="text-center text-xl p-2 font-basetext bg-secondary rounded-full hover:bg-secondary/75">Dog Food</p></Link>
                        </div>
                    </div>
                    <div className="self-center justify-self-center my-4">
                        <div>
                            <div className="my-4 p-10 bg-alternative rounded-2xl"><img src={DogAccessoryImg} alt="" className="w-[120px]" /></div>
                            <Link to="/shop/dogs/accessories"><p className="text-center text-xl p-2 font-basetext bg-secondary rounded-full hover:bg-secondary/75">Dog Accessories</p></Link>
                        </div>
                    </div>
                    <div className="self-center justify-self-center my-4">
                        <div>
                            <div className="my-4 p-10 bg-alternative rounded-2xl"><img src={DogToyImg} alt="" className="w-[120px]" /></div>
                            <Link to="/shop/dogs/toys"><p className="text-center text-xl p-2 font-basetext bg-secondary rounded-full hover:bg-secondary/75">Dog Toys</p></Link>
                        </div>
                    </div>
                </div>}
            </div>
        </>
    )
}