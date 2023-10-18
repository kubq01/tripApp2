import NavBar from "./NavBar.tsx";
import UserProfile from "../user/UserProfile.tsx";
import NavBar2 from "./NavBar2.tsx";
import TripHomescreenCards from "../trip/TripHomescreenCards.tsx";

function HomeScreen() {
    return (
        <>
            <NavBar2/>
            <div className="App">
                <div className="container">
                    <section className="position-relative py-4 py-xl-5">
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-6 col-xl-4">
                                <div className="card mb-5">
                                    <UserProfile/>
                                </div>
                            </div>
                            <div className="col-md-6 col-xl-4">
                                <div className="card mb-5">
                                    <TripHomescreenCards/>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>

    )
}

export default HomeScreen