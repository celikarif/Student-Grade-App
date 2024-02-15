import React from "react";
import { Link } from "react-router-dom";

function Header()
{
    return(
        <React.Fragment>
             <nav className="navbar">
                <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <ul className="navbar-nav">
                           <br></br>
                            <li className="nav-item"><Link to="/listofstudents" className="nav-link">Öğrenci Listesi</Link></li>
                            <li className="nav-item"><Link to="/addStudent" className="nav-link">Öğrenci Ekle</Link></li>
                                                                                                        
                        </ul>

                    </div>
                </div>
                </div>

            </nav>
        </React.Fragment>
    );
}

export default Header;