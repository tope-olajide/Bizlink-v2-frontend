import React, {Component}  from"react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from "react-toastify";
import {MDBNavbar, MDBModalHeader, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBContainer,
  MDBModal,
  MDBModalBody,
  Row,
  Col
} from "mdbreact";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn, signUp } from "../../actions/authActions";
import { validateUser } from "../../utils/validator";
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'
import PropTypes from 'prop-types';
import "react-toastify/dist/ReactToastify.css";
export class AuthNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      modal6: false,
      modal7: false,
      isLoggingIn:false,
      isSigningUp: false,
      fullname: "",
      username: "",
      email: "",
      password: "",
      usernameOrEmail: "",
      confirmPassword: ""
    };
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    this.setState({
      collapse: !this.state.collapse
    });
  }
  saveToState = (key, value)=> {
    this.setState({ [key]: value });
  }

  handleSignUp = () => {
    const validateSignupError = validateUser(this.state);
    if (validateSignupError) {
      toast.error(validateSignupError, {
        position: "bottom-left"
      });
    } else if (this.state.password !== this.state.confirmPassword) {
      toast.error("passwords does not match", {
        position: "bottom-left"
      });
    } else {
      this.setState({isSigningUp:true})
      toast.info("Signing you up...", {
        position: "bottom-left"
      });
      this.props.signUp(this.state).then(
        () => {
          toast.success(`Welcome <br/><em>${this.state.username}</em>`, {
            position: "bottom-left"
          });
          setTimeout(() => {
            window.location = "/";
          }, 500);
        },
        error => {
          this.setState({isSigningUp:false})
          if(!error.response){ toast.error('Network Error', {
              position: "bottom-left"
            });
          }
          else {
            toast.error(error.response.data.message, {
              position: "bottom-left"
            });
          }
        }
      );
    }
  };

  handleSignIn = () => {
    this.setState({
      isLoggingIn: true,
    });
    toast.info('logging in... ', {
      position: "bottom-left"
    });
    this.props.signIn(this.state)
      .then(() => {
        toast.success(`Welcome back <br/><em>${this.state.usernameOrEmail}</em>`, {
          position: "bottom-left"
        });
        setTimeout(() => {
          window.location = '/';
        }, 500);
      },
      (error) => {
        this.setState({
          isLoggingIn: false
      });
      if(!error.response){ toast.error('Network Error', {
        position: "bottom-left"
      });
    }
    else {
      toast.error(error.response.data.message, {
        position: "bottom-left"
      });
    }
      });
  }
   toggle = (nr)=> {
    let modalNumber = "modal" + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
  }
  render() {
    return (
      <>
        <MDBNavbar color="indigo" dark expand="md" scrolling>
        <Link to="/">
            <h5 className="white-text">BISLINK</h5></Link>
          <MDBNavbarToggler onClick={this.onClick} />
          <MDBCollapse isOpen={this.state.collapse} navbar>
            <MDBNavbarNav right>
              
                <Link to="#" onClick={() => this.toggle(7)}>
                  <FontAwesomeIcon  className="white-text" icon="user-plus" /> <h6 className="white-text d-inline mr-4">SIGN UP</h6>
                </Link>
                <Link to="#" onClick={() => this.toggle(6)}>
                  <FontAwesomeIcon  className="white-text" icon="sign-in-alt" /> <h6 className="white-text d-inline">LOGIN</h6> </Link>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>
        <div>
          <MDBModal
            className="mt-5 pt-2"
            isOpen={this.state.modal6}
            toggle={() => this.toggle(6)}
            side
            position="top-right"
          >
          <MDBModalHeader toggle={() => this.toggle(6)}>Signin to you Acount</MDBModalHeader>
            <MDBModalBody>
              <MDBContainer>
                <Row>
                  <Col md="">
                    <SignInForm 
                    isLoggingIn={this.state.isLoggingIn}
                    usernameOrEmail={this.state.usernameOrEmail}
                    saveToState = {this.saveToState}
                    handleSignIn = {this.handleSignIn}
                    />
                  </Col>
                </Row>
              </MDBContainer>
            </MDBModalBody>
          </MDBModal>
          <MDBModal
            className="mt-5 "
            isOpen={this.state.modal7}
            toggle={() => this.toggle(7)}
            side
            position="top-right"
          ><MDBModalHeader toggle={() => this.toggle(7)}>Register for a new Acount</MDBModalHeader>
            <MDBModalBody>
              <div>
                <Row>
                  <Col>
                    <SignUpForm
                    fullname={this.state.fullname}
                    username={this.state.username}
                    email = {this.state.email}
                    password = {this.state.password}
                    confirmPassword = {this.state.confirmPassword}
                    saveToState = {this.saveToState}
                    isSigningUp = {this.state.isSigningUp}
                    handleSignUp = {this.handleSignUp}
                    />
                  </Col>
                </Row>
              </div>
            </MDBModalBody>
          </MDBModal>
        </div>
        <ToastContainer />
      </>
    );
  }
}

export default connect(null, {signUp, signIn})(AuthNavBar);
