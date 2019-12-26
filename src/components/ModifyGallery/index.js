import React, { Component } from "react";
import PictureGallery from './PictureGallery'
import NavBar from './../commons/NavigationBar';
import Footer from "../commons/Footer";
import LoadingAnimation from "../commons/LoadingAnimation";
import { connect } from "react-redux";
import {
    fetchPictures,setDefaultImage,deletePicture
} from "../../actions/galleryAction";
import { ToastContainer, toast } from "react-toastify";
import ErrorPage from "../commons/ErrorPage";
class ModifyGallery extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      isError: false,
    };
  }
    componentDidMount() {
        this.fetchBusinessPictures()
      }
    fetchBusinessPictures = () => {
        const id = this.props.match.params.businessId;
        this.props
          .dispatch(fetchPictures(id))
          .then(() => {
            this.setState({
                isLoading: false,
                isError: false,
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
      }
      setDefaultBusinessImage = (businessImageUrl) => {
        const id = this.props.match.params.businessId;
        this.props
          .dispatch(setDefaultImage(id, businessImageUrl))
          .then(() => {
            toast.success('Default business image set successfully`', {
              position: "bottom-left"
            });
          })
          .catch(error => {
            alert(error)
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
      deleteBusinessPicture = (id) => {
        this.props
          .dispatch(deletePicture(id))
          .then(() => { alert('success')
          })
          .catch(error => {
          alert(error)
          });
      };

    render () {
      if (this.state.isLoading) {
        return (
          <>
            <LoadingAnimation />
          </>
        );
        
      } else if (this.state.isError) {
        return (
          <><ErrorPage />
          </>
        );
      }
        return (

<>
<NavBar />
<div className="container content-container">
    <div className="row card-container">
{this.props.businessPictures.map((picture)=>{
    if(picture.length !==0&&picture.imageUrl){
    return (
        <>
    <PictureGallery
 key= {picture.id}
 id= {picture.id}
 image= {picture.imageUrl}
 deleteBusinessPicture={this.deleteBusinessPicture}
 setDefaultBusinessImage={this.setDefaultBusinessImage}
    />  
    </>) } 
})
}
    </div>
    </div>
    <ToastContainer />
    <Footer />
</>
        )
    }
}
const mapStateToProps = state => {
  console.log(state.gallery)
    return {
        businessPictures: state.gallery.businessPictures
    };
  }
export default connect(mapStateToProps)(ModifyGallery);