import React, { Component } from "react";
import axios from "axios";
import { addBusiness } from "../../actions/businessActions";
import BusinessForm from "../commons/BusinessForm";
import NavBar from "../commons/NavigationBar";
import Footer from "../commons/Footer";
import { ToastContainer, toast } from "react-toastify";
import { connect } from "react-redux";
import ErrorPage from "../commons/ErrorPage";
class BusinessList extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      isError: false,
      businessName: "",
      tagline: "",
      businessAddress: "",
      phoneNumber: "",
      website: "",
      category: "",
      businessImageUrl: "",
      businessImageArray: [],
      businessDescription: "",
      files: [],
      filesToBeSent: [],
      imageUrl: "",
      imageUploadError: false,
      imageId: "",
      isSavingBusiness: false,
      UploadBottonLabel: "Register Business",
      loadingIcon: ""
    };
    this.onDrop = this.onDrop.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  disableLoading = () => {
    this.setState({
      isSavingBusiness: false
    });
  };
  enableLoading = () => {
    this.setState({
      isSavingBusiness: true
    });
  };
  onDrop(files) {
    this.setState({
      filesToBeSent: files,
      files: files.map(file => ({
        ...file,
        preview: URL.createObjectURL(file)
      }))
    });
  }
  handleInputChange(key, value) {
    this.setState({ [key]: value });
  }
  handleFormSubmit = files => {
    if (this.state.filesToBeSent.length >= 1) {
      // start loading animation
      this.enableLoading();
      toast.info(`uploading pictures...`, {
        position: "bottom-left"
      });
      
      // Push all the axios request promise into a single array
      const uploaders = this.state.filesToBeSent.map(async file => {
        // Initial FormData
        const formData = new FormData();
        formData.append("upload_preset", "sijxpjkn");
        formData.append("api_key", "139423638121511");
        formData.append("file", file);
        formData.append("timestamp", (Date.now() / 1000) | 0);

        // Make an AJAX upload request using Axios
        try {
          let response = await axios({
            method: "post",
            url: "https://api.cloudinary.com/v1_1/temitope/image/upload",
            data: formData,
            headers: { "X-Requested-With": "XMLHttpRequest" },
            transformRequest: [
              (data, headers) => {
                delete headers.authorization;
                console.log(headers)
                return data;
              }
            ]
          });
          const { data } = response;
          const { secure_url, public_id } = data;
          this.setState(prevState => ({
            businessImageArray: [
              ...prevState.businessImageArray,
              { imageUrl: secure_url, imageId: public_id }
            ]
          }));
          toast.info(`${file} uploaded successfully!`, {
            position: "bottom-left"
          });
        }
        catch (err) {
          toast.error(`${err}`, {
            position: "bottom-left"
          });
          this.setState({ imageUploadError: true });
          this.disableLoading();
        }
      });
      // Once all the files are uploaded
      axios
        .all(uploaders)
        .then(data => {
          if (this.state.imageUploadError) {
            this.disableLoading();
            return toast.error(`unable to upload pictures`, {
              position: "bottom-left"
            });
          } else {
            toast.info(`All picures uploaded successfully, now saving to database`, {
              position: "bottom-left"
            });
            const imgUrlToString = JSON.stringify(
              this.state.businessImageArray
            );
            console.log(this.state.businessImageArray)
            this.setState({ businessImageUrl: imgUrlToString });
            this.props.dispatch(addBusiness(this.state)).then(() => {
              toast.success(`saved to database successfully`, {
                position: "bottom-left"
              })
              this.disableLoading();
            });
          }
        })
        .catch(function(err) {
          toast.error(`${err.response.data.message}`, {
            position: "bottom-left"
          })
        });
      this.disableLoading();
    } else {
      const {
        businessName,
        tagline,
        businessAddress,
        phoneNumber,
        website,
        category,
        businessDescription
      } = this.state;
      this.setState({
        isSavingBusiness: true
      });
      toast.info('saving...', {
        position: "bottom-left"
      })
      this.props
        .dispatch(
          addBusiness({
            businessName,
            tagline,
            businessAddress,
            phoneNumber,
            website,
            category,
            businessDescription
          })
        )
        .then(() => {
          
          toast.success('saved to database successfully', {
            position: "bottom-left"
          })
          this.disableLoading();
        })
        .catch(err => {
          toast.error(` ${err.response.data.message}`, {
            position: "bottom-left"
          })
          this.setState({ isSavingBusiness: false });
        });
    }
  };
  render() {
    if (this.state.isError) {
      return (
        <>
          <ErrorPage />
        </>
      );
    }
    return (
      <div>
        <NavBar addBusiness="active" />
        <BusinessForm
          files={this.state}
          onDrop={this.onDrop}
          handleFormSubmit={this.handleFormSubmit}
          handleInputChange={this.handleInputChange}
          buttonName={"Save Business"}
          isSavingBusiness={this.state.isSavingBusiness}
          showModifyGalleryButton={false}
          title={"Business Registration Form"}
        />
        <ToastContainer />
        <Footer />
      </div>
    );
  }
}
export default connect()(BusinessList);
