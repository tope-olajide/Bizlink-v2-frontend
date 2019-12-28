import React, { Component } from "react";
import { MDBCol } from "mdbreact";
import {
  fetchAllNewNotifications,
  fetchAllReadNotifications
} from "../../actions/notificationAction";
import NavigationBar from "../commons/NavigationBar";
import Footer from "../commons/Footer";
import NotificationList from "./NotificationList";
import { ToastContainer, toast } from "react-toastify";
import LoadingAnimation from "../commons/LoadingAnimation";
import NotificationNav from "./NotificationNav";
import { connect } from "react-redux";
import formatDate from "../../utils/dateFormat";
import ErrorPage from "../commons/ErrorPage";
class SeenNotifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isError: false
    };
  }
  componentDidMount() {
    this.fetchAllReadNotifications();
  }
  fetchAllReadNotifications = () => {
    this.setState({ isLoading: true });
    this.props
      .dispatch(fetchAllReadNotifications())
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
  fetchNewNotifications = () => {
    this.setState({ isLoading: true });
    this.props
      .dispatch(fetchAllNewNotifications())
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
                <h5>Notifications</h5>
              </a>
            </li>
          </ul>
          <div className="row">
            <div className="col-md-4 ">
              <NotificationNav
                newNotificationsCount={this.props.unreadNotificationsCount}
                readNotificationsCount={this.props.readNotifications.length}
                allNotificationsCount={this.props.allNotificationsCount}
                isReadNotificationActive={true}
              />
            </div>
            <div className="col-md-8 ">
              <MDBCol className="mt-0 mb-5">
                {this.props.readNotifications.map(notification => {
                  return (
                    <NotificationList
                      key={notification.id}
                      id={notification.id}
                      title={notification.title}
                      date={formatDate(notification.createdAt)}
                    />
                  );
                })}
              </MDBCol>
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
    unreadNotificationsCount:
      state.notifications.readNotification.unreadNotificationsCount||0,
    allNotificationsCount:
      state.notifications.readNotification.allNotificationsCount||0,
    readNotifications:
      state.notifications.readNotification.readNotifications||[]
  };
};
export default connect(mapStateToProps)(SeenNotifications);
