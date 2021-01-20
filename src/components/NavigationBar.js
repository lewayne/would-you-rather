import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAuthUser } from '../actions/authUser';
import { Nav, Navbar, Button, Image } from 'react-bootstrap'


class NavigationBar extends Component {
  handleLogout = e => {
    e.preventDefault();
    this.props.setAuthUser(null);
  };

  render() {
    const { authUser, users } = this.props;

    return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                  <Navbar.Brand href="#logo">Would you Rather ?</Navbar.Brand>
                  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                  <Navbar.Collapse id="responsive-navbar-nav">
                      <Nav className="mr-auto">
                        <Nav.Link name="dashboard" as={NavLink} to="/" exact> Dashboard </Nav.Link>
                        <Nav.Link name="add" as={NavLink} to="/add" >Create Question</Nav.Link>
                        <Nav.Link name="leaderboard" as={NavLink} to="/Leaderboard" >Leaderboard</Nav.Link>
                      </Nav>

                       <Nav>
                               <Image src={users[authUser].avatarURL}  roundedCircle style={{ height: 50, width: 50, marginRight:10 }} /> 
                               <div style={{color: 'white', fontWeight:"bolder", marginTop:10 }}> {users[authUser].name} </div>
                                {    /**  <Nav.Link name="logout" as={NavLink} to="/logout" >Logout</Nav.Link> */}
                             
                              <Nav.Link eventKey={2} href="#memes">
                                <Button onClick={this.handleLogout}>Logout</Button>
                              </Nav.Link>
                       </Nav>
                      </Navbar.Collapse>
                    </Navbar>              
    );
  }
}

function mapStateToProps({ users, authUser }) {
  return { authUser, users };
}

export default connect( mapStateToProps, { setAuthUser } )(NavigationBar);
