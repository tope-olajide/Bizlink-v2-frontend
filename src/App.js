import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHome,
  faBriefcase,
  faSearch,
  faFolderPlus,
  faUserPlus,
  faSignInAlt,
  faMapMarker,
  faMobile,
  faLink,
  faHeartbeat,
  faSpinner,
  faMapMarkerAlt,
  faMobileAlt,
  faHeart,
  faThumbsDown,
  faThumbsUp,
  faEye,
  faTag,
  faTrash,
  faEdit,
  faBell,
  faSignOutAlt,
  faUserAlt
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faEye as faEyeRegular } from "@fortawesome/free-regular-svg-icons";
import AuthPage from "./components/Auth/index";
import BusinessList from "./components/BusinessList";
import withAuthorization from "./utils/withAuthorization";
import AddBusiness from "./components/RegisterBusiness";
import BusinessDetails from "./components/BusinessDetails";
import Profile from "./components/Profile";
import ModifyUser from "./components/ModifyUser";
import ModifyBusiness from "./components/ModifyBusiness";
import ModifyGallery from "./components/ModifyGallery";
import Notifications from "./components/Notifications";
import AllNotifications from "./components/Notifications/AllNotifications";
import NotificationDetails from "./components/Notifications/NotificationDetails";
import SeenNotification from "./components/Notifications/ReadNotifications";
import BusinessSearch from "./components/BusinessSearch";


library.add(
  faHome,
  faBriefcase,
  faSearch,
  faFolderPlus,
  faUserPlus,
  faSignInAlt,
  faMapMarker,
  faMobile,
  faLink,
  faHeartbeat,
  faSpinner,
  faMapMarkerAlt,
  faMobileAlt,
  faHeart,
  faHeartRegular,
  faThumbsDown,
  faThumbsUp,
  faEye,
  faEyeRegular,
  faTag,
  faTrash,
  faEdit,
  faBell,
  faSignOutAlt,
  faUserAlt
);
class App extends Component {
  render() {
    return (
      <>
        {" "}
        <Switch>
          <Route exact path="/auth" component={AuthPage} />
          <Route
            exact
            path="/register-business"
            component={withAuthorization(AddBusiness)}
          />
          <Route exact path="/" component={withAuthorization(BusinessList)} />
          <Route
            path="/business-details/:businessId"
            component={withAuthorization(BusinessDetails)}
          />
          <Route
            exact
            path="/view-profile"
            component={withAuthorization(Profile)}
          />
          <Route
            path="/modify-user"
            component={withAuthorization(ModifyUser)}
          />
          <Route
            path="/modify-business/:businessId"
            component={withAuthorization(ModifyBusiness)}
          />
          <Route
            exact
            path="/notifications"
            component={withAuthorization(Notifications)}
          />
          <Route
            exact
            path="/notifications/all"
            component={withAuthorization(AllNotifications)}
          />
          <Route
            exact
            path="/notifications/seen"
            component={withAuthorization(SeenNotification)}
          />
          <Route
            exact
            path="/notifications/:notificationId"
            component={withAuthorization(NotificationDetails)}
          />
          <Route
            exact
            path="/modify-gallery/:businessId"
            component={withAuthorization(ModifyGallery)}
          />
          <Route
            exact
            path="/businesses/search/name=:name?/location=:location?"
            component={withAuthorization(BusinessSearch)}
          />
          <Route
            exact
            path="/businesses/search/sort=:sort?"
            component={withAuthorization(BusinessSearch)}
          />
          />
        </Switch>
      </>
    );
  }
}

export default App;
