import React, {useState} from 'react';
import {Link, useHistory} from "react-router-dom";
// import Search from "../Search";
import Logo from "../../Logo/ticket.png"

const Header = () => {
    const [search,setSearch] = useState('')
    const history = useHistory()
    const searchInput = (e)=>{
        setSearch(e.target.value)
    }
    const handleSearch = ()=>{
        setSearch('')
        if (search.trim()) {
            history.push(`/browse/${search}`)
        }
    }

    return (
        <div className="navbar navbar-light  p-4" style={{backgroundColor: "rgba(197, 239, 247, 1)"}}>
            <div className="container-fluid">
                <Link to={`/`}>
                    <img src={Logo} alt="" style={{height: "90px", paddingLeft: "70px"}} />
                    <span className="navbar-brand"><h3 style={{display: "inline-block"}}>.kg</h3></span>
                </Link>
                <div className="menu-link">
                    <Link to={'/'} className="text text-outline-info"  ><h5>Welcome</h5></Link>
                </div>
                <form className="d-flex">
                    <input onKeyPress={el=>{if(el.key==='Enter')handleSearch()}} type="text" className="form-control me-2"  onChange={searchInput} placeholder="Search"   value={search} aria-label="Search" />
                    {/*<Link to={`/search/name`}>*/}
                        <button className="btn btn-outline-info" onClick={handleSearch} type="submit">Search</button>
                    {/*</Link>*/}
                </form>
            </div>
        </div>

    );
};

export default Header;