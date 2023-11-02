import NavBar from "./NavBar.tsx";
import UserProfile from "../user/UserProfile.tsx";
import NavBar2 from "./NavBar2.tsx";
import TripHomescreenCards from "../trip/TripHomescreenCards.tsx";

function HomeScreen() {

    return (
        <>
            <NavBar2/>
            <main className="App">
                <div className="d-flex flex-row justify-content-evenly w-100">
                    <div className="">
                        <UserProfile/>
                    </div>
                    <div className="">
                        <TripHomescreenCards/>
                    </div>
                </div>
            </main>
        </>

    )
}

export default HomeScreen