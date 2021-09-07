import React from 'react';
import {Link} from "react-router-dom";

const Header = () => {
    return (
            <div className="navbar navbar-light bg-light p-4">
                <div className="container-fluid">
                    <Link to={`/`}>
                        <h2 className="navbar-brand">Logo</h2>
                    </Link>
                    <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <Link to={`/search/name`}>
                                <button className="btn btn-outline-info" type="submit">Search</button>
                            </Link>
                    </form>
                </div>
            </div>

    );
};

export default Header;