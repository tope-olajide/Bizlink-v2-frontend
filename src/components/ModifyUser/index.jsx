import React, { Component } from "react";
import axios from "axios";
import { updateProfile } from "../../actions/authActions";
import EditProfileForm from "./EditProfileForm";
import LoadingAnimation from "../commons/LoadingAnimation";
import { fetchUsersProfile } from "../../actions/userAction";
import NavigationBar from "./../commons/NavigationBar";
import Footer from "../commons/Footer";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import ErrorPage from "../commons/ErrorPage";
class ModifyUser extends Component {
  constructor() {
    super();
    this.state = {
      fullname: "",
      email: "",
      about: "",
      location: "",
      phoneNumber: "",
      files: [],
      profile: [],
      imageUrl: "",
      imageId: "",
      isLoading: true
    };
    this.onDrop = this.onDrop.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
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
          isError: false,
          fullname: this.props.usersProfile.fullname,
          email: this.props.usersProfile.email,
          phoneNumber: this.props.usersProfile.phoneNumber,
          location: this.props.usersProfile.location,
          about: this.props.usersProfile.about
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

  onDrop(files) {
    this.setState({
      profile: files,
      files: files.map(file => ({
        ...file,
        preview: URL.createObjectURL(file)
      }))
    });
  }
  handleInputChange(key, value) {
    this.setState({ [key]: value });
  }

  handleFormSubmit = () => {
    toast.info(`saving...`, {
      position: "bottom-left"
    });
    // Push all the axios request promise into a single array

    const file = this.state.profile[0];
    // Initial FormData
    if (file) {
      const formData = new FormData();

      formData.append("upload_preset", "sijxpjkn");
      formData.append("api_key", "139423638121511");
      formData.append("file", file);
      formData.append("timestamp", (Date.now() / 1000) | 0);

      // Make an AJAX upload request using Axios
      return axios({
        method: "post",
        url: "https://api.cloudinary.com/v1_1/temitope/image/upload",
        data: formData,
        headers: { "X-Requested-With": "XMLHttpRequest" },
        transformRequest: [
          (data, headers) => {
            delete headers.authorization;
            delete headers.common.authorization;
            console.log(headers)
            return data;
          }
        ]
      })
        .then(response => {
          const data = response.data;
          this.setState({
            imageUrl: data.secure_url,
            imageId: data.public_id
          });
          this.props
            .dispatch(updateProfile(this.state))
            .then(() => {
              toast.success("saved to database successfully", {
                position: "bottom-left"
              });
            })
            .catch(function(err) {
              toast.error(`${err}`, {
                position: "bottom-left"
              })
            });
        })
        .catch(function(err) {
          toast.error(`${err}`, {
            position: "bottom-left"
          })
        });
    }
    // Once all the files are uploaded
    else {
      const { fullname, email, about, location, phoneNumber } = this.state;
      this.props
        .dispatch(
          updateProfile({ fullname, email, about, location, phoneNumber })
        )
        .then(() => {
          toast.success(`saved to database successfully `, {
            position: "bottom-left"
          });
        })
        .catch(function(err) {
          toast.error(`${err}`, {
            position: "bottom-left"
          })
        });
    }
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
        <NavigationBar />
        <EditProfileForm
          defaultFullname={this.props.usersProfile.fullname}
          defaultEmail={this.props.usersProfile.email}
          defaultPhoneNumber={this.props.usersProfile.phoneNumber}
          defaultLocation={this.props.usersProfile.location}
          defaultDesription={this.props.usersProfile.about}
          files={this.state}
          onDrop={this.onDrop}
          handleFormSubmit={this.handleFormSubmit}
          handleInputChange={this.handleInputChange}
        />
        <ToastContainer />
        <Footer />
      </>
    );
  }
}
const mapStateToProps = state => {
  console.log(state.user)
  return {
    usersProfile: state.user.usersProfile
  };
};
export default connect(mapStateToProps)(ModifyUser);
