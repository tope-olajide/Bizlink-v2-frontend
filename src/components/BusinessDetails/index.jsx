import React, { Component } from "react";
import BusinessDetailsPage from "./BusinessDetailsPage";
import BusinessImageGallery from "./BusinessImageGallery";
import Footer from "../commons/Footer";
import {
  fetchBusinessDetails,
  fetchBusinessReviews,
  addBusinessReviews
} from "../../actions/businessActions";
import {
  removeFromFavourite,
  addToFavourite
} from "../../actions/favouriteActions";
import { upvote, downvote } from "../../actions/voteAction";
import { follow, unfollow } from "../../actions/followActions";
import LoadingAnimation from "../commons/LoadingAnimation";
import { ToastContainer, toast } from "react-toastify";
import { connect } from "react-redux";
import NavigationBar from "../commons/NavigationBar";
import ErrorPage from "../commons/ErrorPage";
export class BusinessDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isError: false,
      title: "",
      content: "",
      favouriteIcon: "",
      isFavourite: "",
      followButton: "",
      spinnerIcon: "",
      disableReviewButton: false
    };
    this.reviewRef = React.createRef();
  }

  scrollToReview = () => {
    window.scrollTo(0, this.reviewRef.current.offsetTop);
  };
  toggleReviewButton = () => {
    this.setState({ disableReviewButton: !this.state.disableReviewButton });
  };
  componentDidMount() {
    const id = this.props.match.params.businessId;
    this.fetchBusinessDetails(id);
    console.log(id)
  }
  setFavourite = favourite => {
    if (favourite) {
      this.setState({ favouriteIcon: "fas", isFavourite: true });
    } else {
      this.setState({ favouriteIcon: "far", isFavourite: false });
    }
  };
  fetchBusinessDetails = id => {
    this.props
      .dispatch(fetchBusinessDetails(id))
      .then(() => {
        this.props.dispatch(fetchBusinessReviews(id)).then(() => {
          this.setState({
            isLoading: false,
            isError: false
          });
          this.setFavourite(this.props.otherInfo.isUserFavourite);
        });
      })
      .catch(error => {
        this.setState({
          isLoading: false,
          isError: true
        });
        if (!error.response) {
          toast.error("Network Error!", {
            position: "bottom-left"
          });
        } else {
          toast.error(error.response.data.message, {
            position: "bottom-left"
          });
        }
      });
  };
  saveToState = (key, value) => {
    this.setState({ [key]: value });
  };
  addBusinessReviews = () => {
    this.toggleReviewButton();
    toast.info(` ...submitting your reviewing`, {
      position: "bottom-left"
    });
    const id = this.props.match.params.businessId;
    this.props
      .dispatch(addBusinessReviews(id, this.state))
      .then(() => {
        toast.success(`Your review has been added successfully.`, {
          position: "bottom-left"
        });
        this.toggleReviewButton();
        this.setState({ title: "", content: "" });
      })
      .catch(error => {
        if (!error.response) {
          toast.error("Network Error!", {
            position: "bottom-left"
          });
        } else {
          toast.error(error.response.data.message, {
            position: "bottom-left"
          });
          this.toggleReviewButton();
        }
      });
  };
  setFollow = () => {
    const userId = this.props.businessDetails.User.id;
    if (this.props.otherInfo.isFollowing) {
      this.props
        .dispatch(unfollow(userId))
        .then(() => {
          
          toast.success(`You successfully unfollowed ${
            this.props.businessDetails.User.username
          } `, {
            position: "bottom-left"
          });
        })
        .catch(error => {
          if (!error.response) {
            toast.error("Network Error!", {
            position: "bottom-left"
          });
          } else {
            toast.error(error.response.data.message, {
            position: "bottom-left"
          });
          }
        });
    } else {
      this.props
        .dispatch(follow(userId))
        .then(() => {
          toast.info(`You are now following ${this.props.businessDetails.User.username} `, {
            position: "bottom-left"
          });
        })
        .catch(error => {
          if (!error.response) {
            toast.error("Network Error!", {
            position: "bottom-left"
          });
          } else {
            toast.error(error.response.data.message, {
            position: "bottom-left"
          });
          }
        });
    }
  };
  addToFavourite = () => {
    const id = this.props.match.params.businessId;
    this.setState({
      spinnerIcon: "spinner",
      favouriteIcon: ""
    });
    if (!this.props.otherInfo.isUserFavourite) {
      this.props
        .dispatch(addToFavourite(id))
        .then(() => {
          this.setState({
            favouriteIcon: "fas",
            isFavourite: true,
            spinnerIcon: ""
          });
          
          toast.success(`"${
            this.props.businessDetails.businessName
          }" has been successfully added to your Favourite`, {
            position: "bottom-left"
          });
        })
        .catch(error => {
          if (!error.response) {
            toast.error("Network Error!", {
            position: "bottom-left"
          });
          } else {
            toast.error( `Unable to add "${
              this.props.businessDetails.businessName
            }" to your Favourite ${error}`, {
              position: "bottom-left"
            });
            this.setState({ favouriteIcon: "far", spinnerIcon: "" });
          }
        });
    } else {
      this.props
        .dispatch(removeFromFavourite(id))
        .then(() => {
          this.setState({
            favouriteIcon: "far",
            isFavourite: false,
            spinnerIcon: ""
          });
          toast.success(`"${
            this.props.businessDetails.businessName
          }" has been successfully removed from your Favourite`, {
            position: "bottom-left"
          });
        })
        .catch(error => {
          if (!error.response) {
            toast.error("Network Error!", {
            position: "bottom-left"
          });
          } else {
            
            toast.error( `Unable to remove "${
              this.props.businessDetails.businessName
            }" from your Favourite`, {
              position: "bottom-left"
            });
            this.setState({ favouriteIcon: "fas", spinnerIcon: "" });
          }
        });
    }
  };

  upvoteBusiness = () => {
    const id = this.props.match.params.businessId;
    this.props
      .dispatch(upvote(id))
      .then(() => {
        toast.success(`"${this.props.businessDetails.businessName}" Upvoted successfully`, {
          position: "bottom-left"
        });
      })
      .catch(error => {
        if (!error.response) {
          toast.error("Network Error!", {
            position: "bottom-left"
          });
        } else {
          toast.error(error.response.data.message, {
            position: "bottom-left"
          });
        }
      });
  };
  downvoteBusiness = () => {
    const id = this.props.match.params.businessId;
    this.props
      .dispatch(downvote(id))
      .then(() => {
        toast.success( `"${this.props.businessDetails.businessName}" Downvoted successfully`, {
          position: "bottom-left"
        })
      })
      .catch(error => {
        if (!error.response) {
          toast.error("Network Error!", {
            position: "bottom-left"
          });
        } else {
          toast.error(error.response.data.message, {
            position: "bottom-left"
          });
        }
      });
  };
  editBusiness = () => {
    const id = this.props.match.params.businessId;
    window.location = `/modify-business/${id}`;
  };
  parseImageGallery = () => {
    if (this.props.businessDetails.businessImageUrl) {
      const parsedGallery = JSON.parse(
        this.props.businessDetails.businessImageUrl
      );
      return parsedGallery;
    } else {
      return [
        {
          imageUrl:
            "https://res.cloudinary.com/temitope/image/upload/v1549260007/noimage_1.png",
          imageId: 11
        }
      ];
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
        <BusinessImageGallery
          businessName={this.props.businessDetails.businessName}
          tagline={this.props.businessDetails.tagline}
          upvotes={this.props.businessDetails.upvotes}
          downvotes={this.props.businessDetails.downvotes}
          viewCount={this.props.businessDetails.viewCount}
          favouriteIcon={this.state.favouriteIcon}
          spinnerIcon={this.state.spinnerIcon}
          addToFavourite={this.addToFavourite}
          isBusinessOwner={this.props.otherInfo.isBusinessOwner}
          upvoteBusiness={this.upvoteBusiness}
          downvoteBusiness={this.downvoteBusiness}
          editBusiness={this.editBusiness}
          businessImageUrl={this.parseImageGallery()}
          scrollToReview={this.scrollToReview}
        />
        <BusinessDetailsPage
          saveToState={this.saveToState}
          handleReviewSubmit={this.addBusinessReviews}
          businessDescription={this.props.businessDetails.businessDescription}
          reviewLength={this.props.businessReview.length}
          reviews={this.props.businessReview}
          disableReviewButton={this.state.disableReviewButton}
          title={this.state.title}
          content={this.state.content}
          defaultImage={this.props.businessDetails.defaultBusinessImageUrl}
          businessAddress={this.props.businessDetails.businessAddress}
          phoneNumber={this.props.businessDetails.phoneNumber}
          website={this.props.businessDetails.website}
          category={this.props.businessDetails.category}
          ImageUrl={this.props.businessDetails.User.ImageUrl}
          username={this.props.businessDetails.User.username}
          location={this.props.businessDetails.User.location}
          about={this.props.businessDetails.User.about}
          businessCount={this.props.otherInfo.businessCount}
          followersCount={this.props.otherInfo.followersCount}
          followeesCount={this.props.otherInfo.followeesCount}
          isBusinessOwner={this.props.otherInfo.isBusinessOwner}
          setFollow={this.setFollow}
          followButton={this.state.followButton}
          reviewRef={this.reviewRef}
          isFollowing={this.props.otherInfo.isFollowing}
         
        />
       <ToastContainer />
        <Footer />
      </>
    );
  }
}
const mapStateToProps = state => {
  console.log(state.business)
  return {
    businessDetails: state.business.businessDetails.business,
    otherInfo: state.business.businessDetails.otherInfo,
    businessReview: state.review.reviews||[]
  };
};
export default connect(mapStateToProps)(BusinessDetails);
