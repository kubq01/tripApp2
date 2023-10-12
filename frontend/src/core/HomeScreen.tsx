import NavBar from "./NavBar.tsx";
import UserProfile from "../user/UserProfile.tsx";

function HomeScreen() {
    return (
        <>
            <NavBar/>
            <div className="App">
                <header className="masthead">
                    <div className="intro-body">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8 mx-auto">
                                    <h1 className="brand-heading">Trip App</h1>
                                    <section className="position-relative py-4 py-xl-5">
                                        <div className="container">
                                            <div className="row d-flex justify-content-center">
                                                <div className="col-md-6 col-xl-4">
                                                    <div className="card mb-5">
                                                        <UserProfile/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        </>

    )
}

export default HomeScreen