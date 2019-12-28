import React, { Component } from "react";
import { MDBListGroup, MDBListGroupItem } from "mdbreact";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchSingleNotification } from "../../actions/notificationAction";
import NavigationBar from "../commons/NavigationBar";
import { ToastContainer, toast } from "react-toastify";
import LoadingAnimation from "../commons/LoadingAnimation";
import Footer from "../commons/Footer";
import { connect } from "react-redux";
import NotificationNav from "./NotificationNav";
import ErrorPage from "../commons/ErrorPage";
class NotificationDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isError: false
    };
  }
  componentDidMount() {
    this.fetchNotificationDetails();
  }
  fetchNotificationDetails = () => {
    const { notificationId } = this.props.match.params;
    this.setState({ isLoading: true });
    this.props
      .dispatch(fetchSingleNotification(notificationId))
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
        <NavigationBar />
        <div className="card p-5 text-center mt-4 notification-container">
          <ul class="nav nav-tabs ">
            <li class="nav-item">
              <a class="nav-link active" href="#">
                <h5>
                  <FontAwesomeIcon icon="bell" className="mr-2" /> Notifications
                </h5>
              </a>
            </li>
          </ul>
          <div className="row">
            <div className="col-md-4 ">
              <NotificationNav
                newNotificationsCount={this.props.unreadNotificationsCount}
                readNotificationsCount={this.props.readNotificationsCount}
                allNotificationsCount={this.props.allNotificationsCount}
              />
            </div>
            <div className="col-md-8 ">
              <MDBListGroup className="px-1">
                <MDBListGroupItem className="py-4 my-2">
                  <h5 className="text-right d-inline  ">
                    {this.props.notificationDetails}
                  </h5>
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1" />
                  </div>
                </MDBListGroupItem>
              </MDBListGroup>
            </div>
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
    notificationDetails:
      state.notifications.viewNotificationDetails.notification,
    allNotificationsCount:
      state.notifications.viewNotificationDetails.allNotificationsCount,
    readNotificationsCount:
      state.notifications.viewNotificationDetails.readNotificationsCount,
    unreadNotificationsCount:
      state.notifications.viewNotificationDetails
        .unreadNotificationsCount
  };
};

export default connect(mapStateToProps)(NotificationDetails);
