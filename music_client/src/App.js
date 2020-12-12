import React, { useState } from "react";

import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./components/Home/Home";
import { News } from "./components/News/News";
import Discography from "./components/Discography/Discography";
import Connect from "./components/ConnectLinks/Connect";
import RouterError from "./components/RouterError";
import Navigation from "./components/Navigation/Nav";
import NewsUpdate from "./components/News/NewsUpdate";
import ReleaseUpdate from "./components/Discography/ReleaseUpdate";
import LogIn from "./components/LogIn";
import AdminNavigation from "./components/Navigation/AdminNav";
import { Col, Row } from "reactstrap";
import ConnectUpdate from "./components/ConnectLinks/ConnectUpdate";
import HomePageUpdate from "./components/Home/HomePageUpdate";
import Images from "./components/ImageGallery/ImageGallery";
import ImageGalleryUpdate from "./components/ImageGallery/ImageGalleryUpdate";
import ImageGalleryEdit from "./components/ImageGallery/ImageGalleryEdit";
import Biog from "./components/Biog/Biog";
import { BiogEditor } from "./components/Biog/BiogEditor";


function App() {
  const [isLoggedIn, setLoggedIn] = useState(() => {
    return window.localStorage.getItem("jwt-auth") !== null;
  });

  const logOut = () => {
    window.localStorage.removeItem("jwt-auth");
    setLoggedIn(false);
  };

  const loggerIn = () => {
    setLoggedIn(true);
  };

  return (
    <main>
      <Navigation isLoggedIn={isLoggedIn} loggerOuter={logOut} />
      {isLoggedIn && <AdminNavigation />}
      <Row>
        <Col xs="12">
          <Switch>
            <Route path="/" isLoggedIn={isLoggedIn} component={Home} exact />
            <Route
              path="/biog"
              isLoggedIn={isLoggedIn}
              component={Biog}
              exact
            />
            <Route
              path="/news"
              render={(props) => <News {...props} isLoggedIn={isLoggedIn} />}
            />
            <Route
              path="/discog"
              render={(props) => (
                <Discography {...props} isLoggedIn={isLoggedIn} />
              )}
            />
            <Route
              path="/connect"
              render={(props) => <Connect {...props} isLoggedIn={isLoggedIn} />}
            />
            <Route
              path="/images"
              render={(props) => <Images {...props} isLoggedIn={isLoggedIn} />}
            />
            <Route
              path="/newsupdate"
              render={() => (isLoggedIn ? <NewsUpdate /> : <Redirect to="/" />)}
            />
            <Route
              path="/releaseupdate"
              render={() =>
                isLoggedIn ? <ReleaseUpdate /> : <Redirect to="/" />
              }
            />
            <Route
              path="/connectupdate"
              render={() =>
                isLoggedIn ? <ConnectUpdate /> : <Redirect to="/" />
              }
            />
            <Route
              path="/homepageupdate"
              render={() =>
                isLoggedIn ? <HomePageUpdate /> : <Redirect to="/" />
              }
            />
            <Route
              path="/imagesupdate"
              render={() =>
                isLoggedIn ? <ImageGalleryUpdate /> : <Redirect to="/" />
              }
            />
            <Route
              path="/biogupdate"
              render={() => (isLoggedIn ? <BiogEditor /> : <Redirect to="/" />)}
            />
            <Route
              path="/imagesedit"
              render={() =>
                isLoggedIn ? <ImageGalleryEdit /> : <Redirect to="/" />
              }
            />

            <Route
              path="/login"
              render={(props) =>
                isLoggedIn ? (
                  <Redirect to="/" />
                ) : (
                  <LogIn {...props} loggerIn={loggerIn} />
                )
              }
            />

            <Route component={RouterError} />
          </Switch>
        </Col>
      </Row>
    </main>
  );
}
export default App;
