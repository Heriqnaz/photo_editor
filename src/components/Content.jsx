import React from 'react';
import PropTypes from 'prop-types';
import '../css/content.css';
import {Nav, Navbar, NavDropdown} from 'react-bootstrap';

const Content = ({selectedPhoto}) => {
    const handleClick = () => {
        const event = new CustomEvent('hideSidebar');
        dispatchEvent(event);
    };

    return (
        <div className='content' onClick={handleClick}>
            <Navbar bg="light" variant="light" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavDropdown title="Effects">
                            <NavDropdown.Item href="#effects">Blur</NavDropdown.Item>
                            <NavDropdown.Item href="#filter">Magic</NavDropdown.Item>
                            <NavDropdown.Item href="#sticker">Pop Art</NavDropdown.Item>
                            <NavDropdown.Item href="#effects">Blur</NavDropdown.Item>
                            <NavDropdown.Item href="#filter">Magic</NavDropdown.Item>
                            <NavDropdown.Item href="#sticker">Pop Art</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Frame">
                            <NavDropdown.Item href="#effects">Birthday</NavDropdown.Item>
                            <NavDropdown.Item href="#filter">Love</NavDropdown.Item>
                            <NavDropdown.Item href="#sticker">Party Time</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Sticker">
                            <NavDropdown.Item href="#effects">Flower</NavDropdown.Item>
                            <NavDropdown.Item href="#filter">Butterfly</NavDropdown.Item>
                            <NavDropdown.Item href="#sticker">Tree</NavDropdown.Item>
                            <NavDropdown.Item href="#effects">Flower</NavDropdown.Item>
                            <NavDropdown.Item href="#filter">Butterfly</NavDropdown.Item>
                            <NavDropdown.Item href="#sticker">Tree</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#Crop">Crop</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <div className="img-box">
                <div className='edit-img'>
                    {
                        selectedPhoto &&
                        <img src={selectedPhoto} style={{width: '100%', height: '100%'}} alt='Not found'/>
                    }
                </div>
            </div>
        </div>
    );
};

Content.propTypes = {
    selectedPhoto: PropTypes.string.isRequired
};

export default Content;