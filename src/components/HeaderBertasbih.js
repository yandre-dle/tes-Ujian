import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import { onUserLogout, keepLogin } from '../actions';

const cookies = new Cookies();

class HeaderBertasbih extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    onLogOutSelect = () => {
        this.props.onUserLogout();
        cookies.remove('Ferguso');
    }

    render() {
        if(this.props.username === "") {
            return (
                <div>
                    <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">{this.props.navBrand}</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <Link to="/popoklist"><NavLink>Browse Popok</NavLink></Link>
                            </NavItem>
                            <NavItem>
                                <Link to="/register"><NavLink>Register</NavLink></Link>
                            </NavItem>
                            <NavItem>
                                <Link to="/login"><NavLink>Login</NavLink></Link>
                            </NavItem>
                        </Nav>
                    </Collapse>
                    </Navbar>
                </div>
            )
        }
        
        return (
            <div>
                <Navbar color="light" light expand="md">
                <NavbarBrand href="/">{this.props.navBrand}</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="/popoklist">Browse Popok</NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Hello, {this.props.username}
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    <Link to="/managepopok">Manage Popok</Link>
                                </DropdownItem>
                                <DropdownItem>
                                    <Link to="/lihatcart">Cart</Link>
                                </DropdownItem> 
                                <DropdownItem>
                                    <Link to="/lihatHistory">History</Link> 
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={this.onLogOutSelect}>
                                    Logout
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
                </Navbar>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { username: state.auth.username }
}

export default connect(mapStateToProps, { onUserLogout, keepLogin })(HeaderBertasbih);

