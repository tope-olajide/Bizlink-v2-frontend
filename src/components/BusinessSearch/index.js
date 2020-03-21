import React, { Component } from "react";
import BusinessCard from "../commons/BusinessCard";
import NavigationBar from "../commons/NavigationBar";
import Footer from "../commons/Footer";
import LoadingAnimation from "../commons/LoadingAnimation";
import { businessSearch, sortBusinessBy } from "../../actions/businessActions";
import { connect } from "react-redux";
import Pagination from "react-js-pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BusinessListHeader from "./../BusinessList/BusinessListHeader";
import ErrorPage from "../commons/ErrorPage";
import { ToastContainer, toast } from "react-toastify";
class searchBusiness extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isError: false,
      activePage: 1
    };
  }
  componentDidMount() {
    this.handlePageChange();
  }

  handlePageChange = pageNumber => {
    const { sort } = this.props.match.params;
    this.setState({ activePage: pageNumber });
    this.setState({ isLoading: true });
    this.searchOrSort(sort);
  };
  searchOrSort = sort => {
    const { name } = this.props.match.params;
    const { location } = this.props.match.params;
    const limit = 9;
    if (sort) {
      this.props
        .dispatch(sortBusinessBy(sort, this.state.activePage, limit))
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
    } else {
      this.props
        .dispatch(businessSearch(name, location, this.state.activePage, limit))
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
        <NavigationBar search="active" />
        <BusinessListHeader />
        <h1 className="text-center my-5 featured-text">
          <FontAwesomeIcon icon="search" /> {this.props.allBusinesses.length} Businesses Found!
        </h1>
        <div className="container content-container">
          <div className="row card-container">
            {!this.props.allBusinesses.length ? (
              <div>No Business</div>
            ) : (
              this.props.allBusinesses.map(business => {
                return (
                  <>
                    <BusinessCard
                      key={business.id}
                      id={business.id}
                      businessName={business.businessName}
                      category={business.category}
                      reviewCount={business.reviewCount}
                      businessAddress={business.businessAddress}
                      phoneNumber={business.phoneNumber}
                      website={business.website}
                      image={business.defaultBusinessImageUrl}
                      viewCount={business.viewCount}
                      upvotes={business.upvotes}
                      downvotes={business.downvotes}
                    />
                  </>
                );
              })
            )}
          </div>
          <div className="">
            <Pagination
              activePage={this.state.activePage}
              itemsCountPerPage={9}
              totalItemsCount={this.props.totalPages}
              pageRangeDisplayed={5}
              onChange={this.handlePageChange}
              innerClass={"pagination pagination-lg"}
              itemClass={"page-item"}
              linkClass={"page-link"}
              disabledClass={"disabled"}
              activeLinkClass={"active"}
              activeClass={"active"}
            />
          </div>
        </div>
        <ToastContainer />
        <Footer />
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    allBusinesses: state.business.allBusinesses.businesses,
    totalPages: state.business.allBusinesses.totalPages
  };
};

export default connect(mapStateToProps)(searchBusiness);
