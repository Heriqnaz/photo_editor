import React, {useEffect, useState} from 'react';
import '../css/sidebar.css'
import {Card, CardColumns, Nav} from 'react-bootstrap';
import {Download, Image, Search, Upload} from 'react-bootstrap-icons';


function SideBar() {
    const [ isRightMenuOpen, setOpenMenu ] = useState(false);

    const handleClick = () => {
        setOpenMenu(!isRightMenuOpen)
    };

    const handleHide = () => {
        setOpenMenu(false)
    };

    useEffect(() => {
        window.addEventListener('hideSidebar', handleHide);
        return () => {
            window.removeEventListener('hideSidebar', handleHide);
        }
    });

    return (
        <Nav className="sidebar">
            <div className="menu-left-part" style={{marginLeft: (isRightMenuOpen) ? '0' : '-505px'}}>
                <div className="form-group has-search">
                    <span className="fa fa-search form-control-feedback"> <Search color='#999' size={15}/></span>
                    <input type="text" className="form-control" placeholder="Search"/>
                </div>
                <p className='sidebar-title'>Images</p>
                <CardColumns>
                    <Card>
                        <Card.Img
                            variant="top"
                            src="http://bragthemes.com/demo/pinstrap/files/2012/10/clown-220x255.jpeg"/>
                    </Card>
                    <Card>
                        <Card.Img
                            variant="top"
                            src="http://bragthemes.com/demo/pinstrap/files/2012/10/white-house.jpeg"/>
                    </Card>
                    <Card>
                        <Card.Img
                            variant="top"
                            src="http://bragthemes.com/demo/pinstrap/files/2012/10/red-rolls-220x148.jpeg"/>
                    </Card>
                    <Card>
                        <Card.Img variant="top" src="http://bragthemes.com/demo/pinstrap/files/2012/10/rat-rod.jpeg"/>
                    </Card>
                    <Card>
                        <Card.Img
                            variant="top"
                            src="http://bragthemes.com/demo/pinstrap/files/2012/10/pink-rolls-royce.jpeg"/>
                    </Card>
                    <Card>
                        <Card.Img variant="top" src="http://bragthemes.com/demo/pinstrap/files/2012/10/rat-rod.jpeg"/>
                    </Card>
                    <Card>
                        <Card.Img variant="top" src="http://bragthemes.com/demo/pinstrap/files/2012/10/rat-rod.jpeg"/>
                    </Card>
                </CardColumns>
            </div>
            <div className='menu-right-part'>
                <Nav.Link className="sidebar-nav-item">
                    <Upload color='#999' size={29}/>
                    <p>Uploads</p>
                </Nav.Link>
                <Nav.Link
                    className={`sidebar-nav-item ${isRightMenuOpen && 'open'}`}
                    onClick={handleClick}>
                    <Image color='#999' size={29}/>
                    <p>Search</p>
                </Nav.Link>
                <Nav.Link className="sidebar-nav-item">
                    <Download color='#999' size={29}/>
                    <p>Download</p>
                </Nav.Link>
            </div>
        </Nav>
    )
}

export default SideBar;