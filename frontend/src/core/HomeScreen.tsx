import NavBar from "./NavBar.tsx";
import UserProfile from "../user/UserProfile.tsx";
import NavBar2 from "./NavBar2.tsx";
import TripHomescreenCards from "../trip/TripHomescreenCards.tsx";
import {introBodyStyle} from "../config/style.tsx";

function HomeScreen() {

    return (
        <div style={introBodyStyle}>
            <NavBar2/>
            <main className="App" >
                <div className="d-flex flex-row justify-content-evenly w-100" >
                    <div className="">
                        <UserProfile/>
                    </div>
                    <div className="">
                        <TripHomescreenCards/>
                    </div>
                </div>
            </main>
        </div>

    )
}

export default HomeScreen