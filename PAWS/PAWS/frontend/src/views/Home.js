import Header from "../components/Header";
import LandingLogo from "../media/images/paws_main_logo.png";
import HomeImg from "../media/images/home_image.png"

export default function Home(props) {
    return(
        <>
            <Header user={props.user} />
            <div className="site-background min-h-[calc(100vh-93px)]">
                <div className="grid grid-cols-1 md:grid-cols-2 py-8 justify-center">
                    <div className="self-center justify-self-center my-4">
                        <img src={LandingLogo} alt="" className="w-[280px]" />
                    </div>
                    <div className="self-center justify-self-center my-4">
                        <img src={HomeImg} alt="" className="w-[280px] md:w-[420px]" />
                    </div>
                </div>
            </div>
        </>
    )
}