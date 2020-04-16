import React from "react";
import { Navbar, Nav} from 'react-bootstrap';

const Header = props => {
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/home">BELLA</Navbar.Brand>
            {props.btn
                &&
                <Nav className="ml-auto">
                    <Nav.Link href="/logout">Logout</Nav.Link>
                </Nav>
            }    
        </Navbar>
        
    );
}

export default Header;