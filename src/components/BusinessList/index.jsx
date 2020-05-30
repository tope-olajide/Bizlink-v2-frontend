import React, { Component } from "react";
import BusinessCard from "../commons/BusinessCard";
import BusinessListHeader from "./BusinessListHeader";
import { ToastContainer, toast } from "react-toastify";
import LoadingAnimation from "../commons/LoadingAnimation";
import Footer from "../commons/Footer";
import { fetchBusinesses } from "../../actions/businessActions";
import NavigationBar from "../commons/NavigationBar";
import { connect } from "react-redux";
import Pagination from "react-js-pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ErrorPage from "../commons/ErrorPage";
class BusinessList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isError: false,
      activePage: 1,
      businessName: " ",
      businessLocation: " "
    };
    this.myRef = React.createRef();
  }

  componentDidMount() {
    this.handlePageChange();
  }

  scrollToMyRef = e => {
    e.preventDefault();
    window.scrollTo(0, this.myRef.current.offsetTop);
  };
  sortByPopular = e => {
    e.preventDefault();
    window.location = `/businesses/search/sort=popular`;
  };
  handlePageChange = pageNumber => {
    const limit = 9;
    this.setState({ activePage: pageNumber });
    this.props
      .dispatch(fetchBusinesses(pageNumber, limit))
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
        if (!error.response) {
          toast.error("Network Error!", {
            position: "bottom-left"
          });
        } else {
          toast.error(error.response.data.message, {
            position: "bottom-left"
          })
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
    } else {
      return (
        <>
          <NavigationBar  scrollToMyRef={this.scrollToMyRef} />
          <BusinessListHeader />
          <div>
            <h1 className="text-center my-5 featured-text">
              <FontAwesomeIcon icon="briefcase" /> Featured Places
            </h1>
          </div>
              {!this.props.allBusinesses ? (
                <div>No Businesses Found!</div>
              ) : (<div className=" container card-container"> 
                { this.props.allBusinesses.map(business => {
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
                })}
              </div>)}
            
            <div className="center">
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
          <Footer myRef={this.myRef} />
          <ToastContainer />
        </>
      );
    }
  }
}
const mapStateToProps = state => {
  console.log(state.business.allBusinesses)
  return {
    allBusinesses: state.business.allBusinesses.businesses,
    totalPages: state.business.allBusinesses.totalPages
  };
};
/* export default connect(mapStateToProps)(BusinessList) */
export default connect(mapStateToProps)(BusinessList);
