import React from 'react';
import '../css/content.css'
import {Nav, Navbar} from 'react-bootstrap';

export function Content() {
    return (
        <div className='content'>
            <Navbar bg="light" variant="light" expand="lg">
                <Nav className="mr-auto">
                    <Nav.Link href="#effects">Effects</Nav.Link>
                    <Nav.Link href="#filter">Filter</Nav.Link>
                    <Nav.Link href="#sticker">Sticker</Nav.Link>
                    <Nav.Link href="#Crop">Crop</Nav.Link>
                </Nav>
            </Navbar>
            <div className="img-box">
                <div className='edit-img'></div>
            </div>
        </div>
    )
}
