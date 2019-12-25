import React, { Component } from "react";
import ProfilePage from "./ProfilePage";
import LoadingAnimation from "../commons/LoadingAnimation";
import { fetchUsersProfile } from "../../actions/userAction";
import NavigationBar from "../commons/NavigationBar";
import Footer from "../commons/Footer";
import { connect } from "react-redux";
import ErrorPage from "../commons/ErrorPage";
import { ToastContainer, toast } from "react-toastify";
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isError: false
    };
  }
  componentDidMount() {
    this.fetchProfile();
  }
  fetchProfile = () => {
    this.props
      .dispatch(fetchUsersProfile())
      .then(() => {
        this.setState({
          isLoading: false,
          isError: false
        });
      })
      .catch(error => {
        this.setState({
          isLoading: false,
          isError: true
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
  };

  render() {
    if (this.state.isLoading) {
      return (
        <>
          <LoadingAnimation />
        </>
      );
    } else if (this.state.isError) {
      return (
        <>
          <ErrorPage />
        </>
      );
    }
    return (
      <>
        <NavigationBar myProfile="active" />
        <ProfilePage
          about={this.props.usersProfile.about}
          email={this.props.usersProfile.email}
          imageUrl={this.props.usersProfile.imageUrl}
          fullname={this.props.usersProfile.fullname}
          username={this.props.usersProfile.username}
          myBusinessCount={this.props.usersProfile.myBusinessCount}
          myFollowersCount={this.props.usersProfile.myFollowersCount}
          myFolloweesCount={this.props.usersProfile.myFolloweesCount}
          myBusinesses={this.props.usersProfile.myBusinesses}
        />
        <ToastContainer />
        <Footer />
      </>
    );
  }
}
const mapStateToProps = state => {
  console.log(state)
  return {
    usersProfile: state.user.usersProfile
  };
};
export default connect(mapStateToProps)(Profile);
