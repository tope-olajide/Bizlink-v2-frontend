import React, { Component } from "react";
import axios from "axios";
import { modifyBusiness } from "../../actions/businessActions";
import BusinessForm from "../commons/BusinessForm";
import NavigationBar from "./../commons/NavigationBar";
import Footer from "../commons/Footer";
import { connect } from "react-redux";
import { fetchBusinessDetails } from "../../actions/businessActions";
import LoadingAnimation from "../commons/LoadingAnimation";
import { ToastContainer, toast } from "react-toastify";
import ErrorPage from "../commons/ErrorPage";
class ModifyBusiness extends Component {
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
      isSavingBusiness: false
    };
    this.onDrop = this.onDrop.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  componentDidMount() {
    const id = this.props.match.params.businessId;
    this.fetchBusinessDetails(id);
  }

  fetchBusinessDetails = id => {
    this.props
      .dispatch(fetchBusinessDetails(id))
      .then(() => {
        this.setState({
          isLoading: false,
          isError: false,
          businessName: this.props.businessDetails.businessName,
          tagline: this.props.businessDetails.tagline,
          businessAddress: this.props.businessDetails.businessAddress,
          phoneNumber: this.props.businessDetails.phoneNumber,
          website: this.props.businessDetails.website,
          category: this.props.businessDetails.category,
          businessDescription: this.props.businessDetails.businessDescription
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
  modifyGallery = () => {
    const id = this.props.match.params.businessId;
    window.location = `/modify-gallery/${id}`;
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
    const { businessId } = this.props.match.params;
    if (this.state.filesToBeSent.length >= 1) {
      this.setState({ isSavingBusiness: true });
      toast.info(`uploading pictures...`, {
        position: "bottom-left"
      });
      // start loading animation
      // Push all the axios request promise into a single array
      const uploaders = this.state.filesToBeSent.map(file => {
        // Initial FormData
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
            const { data } = response;
            const { secure_url, public_id } = data;
            this.setState(prevState => ({
              businessImageArray: [
                ...prevState.businessImageArray,
                { imageUrl: secure_url, imageId: public_id }
              ]
            }));
            toast.success(`${file} uploaded successfully!`, {
              position: "bottom-left"
            });
          })
          .catch(err => {
            toast.error(`${err}`, {
              position: "bottom-left"
            });
            this.setState({ isSavingBusiness: false });
            this.setState({ imageUploadError: true });
          });
      });
      // Once all the files are uploaded
      axios
        .all(uploaders)
        .then(data => {
          if (this.state.imageUploadError) {
            this.setState({ isSavingBusiness: false });
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
            this.setState({ businessImageUrl: imgUrlToString });

            this.props
              .dispatch(modifyBusiness(this.state, businessId))
              .then(() => {
                toast.success(`saved to database successfully`, {
                  position: "bottom-left"
                })
                this.setState({ isSavingBusiness: false });
              });
          }
        })
        .catch((err)=> {
          toast.error(`${err.response.data.message}`, {
            position: "bottom-left"
          })
          this.setState({ isSavingBusiness: false });
        });
    } else {
      this.setState({ isSavingBusiness: true });
      toast.info('saving...', {
        position: "bottom-left"
      })
      this.props
        .dispatch(modifyBusiness(this.state, businessId))
        .then(() => {
          toast.success('saved to database successfully', {
            position: "bottom-left"
          })
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
        <BusinessForm
          files={this.state}
          onDrop={this.onDrop}
          handleFormSubmit={this.handleFormSubmit}
          handleInputChange={this.handleInputChange}
          businessName={this.state.businessName}
          tagline={this.state.tagline}
          businessAddress={this.state.businessAddress}
          phoneNumber={this.state.phoneNumber}
          category={this.state.category}
          website={this.state.website}
          businessDescription={this.state.businessDescription}
          modifyGallery={this.modifyGallery}
          buttonName={"Update Business"}
          isSavingBusiness={this.state.isSavingBusiness}
          showModifyGalleryButton={true}
        />
        <ToastContainer />
        <Footer />
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    businessDetails: state.business.businessDetails.business
  };
};
export default connect(mapStateToProps)(ModifyBusiness);
