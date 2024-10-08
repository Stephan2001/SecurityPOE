import { Link } from "react-router-dom";

const Navbar = () =>
{
    return(
        <header>
            <div className="container">
                <Link to="/">
                <h1>Librery</h1>
                </Link>
                <Link to="/login">
                <h1>Login</h1>
                </Link>
            </div>
        </header>
    )
}

export default Navbar