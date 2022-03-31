import React ,{useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import booking from "../Images/meeting.png"
import logo from '../Images/logo.png'

const Header = () =>
{

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const user = sessionStorage.getItem('username');
    const username = JSON.parse(user);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    const handleLogOut = () =>
    {
        sessionStorage.clear();
        window.location.reload(false);
    }
    return(
        <div>
            <Navbar className='head'  >
            <NavbarBrand href="/" className="company">DELOITTE</NavbarBrand>
            <NavbarToggler className = 'options' onClick={toggle}/>
                <Collapse isOpen={dropdownOpen} navbar>
                    <Nav navbar>
                        <NavItem>
                            <NavLink className ='NavItem'
                            onClick={event => window.location.href=`/history/data=${username}`}><img src={booking}></img>My Bookings</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className ='NavItem' onClick={handleLogOut}><img src={logo}></img>Log Out</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
            {/* <h3>This is header</h3>
            <Button color="primary" onClick={handleLogOut} className="dp">Log Out</Button>
            <Button 
            color="primary" 
            className="dp"
            onClick={event => window.location.href=`/history/data=${username}`}>View Bookings</Button>
            <hr /> */}
        </div>
    )
}

export default Header;