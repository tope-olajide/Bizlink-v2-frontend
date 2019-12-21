import React, { Component } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
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

import AuthPage from "./components/Auth/index";
import BusinessList from "./components/BusinessList"
import withAuthorization from "./utils/withAuthorization";
import ImageUpload from "./components/Image/index"
import PictureGallery from "./components/Image/PictureGallery"


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
  faThumbsDown,
  faThumbsUp,
  faEye,
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
          <Route exact path="/auth" component={AuthPage} />
          <Route exact path="/" component={withAuthorization(BusinessList)}/>
          
      </>
    );
  }
}

export default App;
