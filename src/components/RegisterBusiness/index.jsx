import React, { Component } from "react";
import axios from "axios";
import { addBusiness } from "../../actions/businessActions";
import BusinessForm from "../commons/BusinessForm";
import NavBar from "../commons/NavigationBar";
import Footer from "../commons/Footer";
import { ToastContainer, toast } from "react-toastify";
import { connect } from "react-redux";
class BusinessList extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
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
    };
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
  onDrop=(files)=> {
    this.setState({
      filesToBeSent: files,
      files: files.map(file => ({
        ...file,
        preview: URL.createObjectURL(file)
      }))
    });
  }
  handleInputChange= (key, value) => {
    this.setState({ [key]: value });
  }
  handleFormSubmit = files => {
    if (this.state.filesToBeSent.length) {

      
      // Push all the axios request promise into a single array
      const uploaders = this.state.filesToBeSent.map(async file => {
              // start loading animation
      this.enableLoading();
      toast.info(`uploading pictures...`, {
        position: "bottom-left"
      });
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
                delete headers.common.authorization;
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
          }));/* 
          toast.success(`${file} uploaded successfully!`, {
            position: "bottom-left"
          }); */
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
      toast.info('saving...',{
        position: "bottom-left"
      }
    )
      const {
        businessName,
        tagline,
        businessAddress,
        phoneNumber,
        website,
        category,
        businessDescription
      } = this.state;
      
      this.enableLoading () ;
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
        .catch((error) => {
          this.setState({ isSavingBusiness: false });
          if (!error.response) {
            toast.error("Network Error!", {
              position: "bottom-left",
            });
          } else {
            toast.error(error.response.data.message, {
              position: "bottom-left",
            });
            
          }
        });
    }
  };
  render() {
    return (
      <>
        <NavBar /><ToastContainer />
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
        
        <Footer />
        
      </>
    );
  }
}
export default connect()(BusinessList);
