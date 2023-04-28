import { useState } from "react";
import { Link } from "react-router-dom";
import PawsLogo from "../media/images/paws_mini_logo.png";
import LoginImg from "../media/images/account_image.png";
import { toast } from "react-toastify";
import axiosInstance from "../utils/AxiosJWT";

export default function Signup() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const verifySignup = () => {
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (firstName === "" || lastName === "" || email === "" || address === "" || password === "") {
            toast.error("Please fill all the fields!");
            return false;
        }
        else if(!email.match(validRegex)) {
            toast.error("Please enter a valid email address.");
            return false;
        }
        else if(password.length < 8)
        {
            toast.error("Password should be at least 8 characters long.");
            return false;
        }
        return true;
    }

    const signup = () => {
        setLoading(true);
        if (!verifySignup()) {
            setLoading(false);
            return;
        }
        axiosInstance.post('user/signup', {
            name: firstName + " " + lastName,
            email: email,
            address: address,
            password: password
        }).then((response) => {
            console.log(response.data);
            localStorage.setItem('jwtToken', response.data.token);
            window.location.href = "/home";
            setLoading(false);
        }).catch((error) => {
            toast.error(error.response.data.message);
            setLoading(false);
        });
    }

    return(
        <>
            <div className="flex flex-wrap items-center justify-between bg-primary px-10">
                <div className="flex items-center">
                    <Link to="/home"><img src={PawsLogo} className="w-[75px]" alt="" /></Link>
                    <h1 className="font-headtext text-5xl ml-4 md:ml-20">Sign-up</h1>
                </div>
                <nav>
                    <ul className="text-xl font-basetext flex flex-row my-4 md:my-0 space-x-8 items-center justify-center">
                        <li>Already have an account?</li>
                        <Link to="/login"><li className="bg-secondary rounded-md font-headtext py-2 px-4">Log - in</li></Link>
                    </ul>
                </nav>
            </div>
            <div className="site-background min-h-[calc(100vh-93px)]">
                <div className="grid grid-cols-1 md:grid-cols-2 py-8 justify-center">
                    <div className="self-center justify-self-center my-4">
                        <div className="block my-2">
                            <input onChange={(e)=>{setFirstName(e.target.value)}} placeholder="First Name" value={firstName} className="rounded-full mr-1 w-[134px] font-basetext outline-none ring-0 px-4 py-2 mx-auto my-4 bg-secondary placeholder:text-amber-900 placeholder:font-basetext" type="text" />
                            <input onChange={(e)=>{setLastName(e.target.value)}} placeholder="Last Name" value={lastName} className="rounded-full ml-1 w-[134px] font-basetext outline-none ring-0 px-4 py-2 mx-auto my-4 bg-secondary placeholder:text-amber-900 placeholder:font-basetext" type="text" />
                        </div>
                        <div className="block my-2">
                            <input id="emailInp" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}} value={email} className="rounded-full w-[275px] font-basetext outline-none ring-0 px-4 py-2 mx-auto my-4 bg-secondary placeholder:text-amber-900 placeholder:font-basetext" type="email" />
                        </div>
                        <div className="block my-2">
                            <input id="addressInp" placeholder="Address" onChange={(e)=>{setAddress(e.target.value)}} value={address} className="rounded-full w-[275px] font-basetext outline-none ring-0 px-4 py-2 mx-auto my-4 bg-secondary placeholder:text-amber-900 placeholder:font-basetext" type="text" />
                        </div>
                        <div className="block my-2">
                            <input id="passInp" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}} value={password} className="rounded-full w-[275px] outline-none ring-0 px-4 py-2 mx-auto my-4 bg-secondary placeholder:text-amber-900 placeholder:font-basetext" type="password" />
                        </div>
                        <div>
                            <button onClick={() => {signup()}} className="block text-xl rounded-md font-headtext outline-none px-4 py-2 mx-auto my-4 bg-secondary hover:bg-secondary/75" disabled={loading}>{loading?("Loading..."):("Sign - up")}</button>
                        </div>
                    </div>
                    <div className="self-center justify-self-center md:justify-self-start my-4 md:ml-12">
                        <div>
                            <img src={LoginImg} className="w-[280px] md:w-[420px] lg:w-[480px]" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}