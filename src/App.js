import React, { Suspense } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch } from 'react-router-dom';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';
import SearchEngine from './allHotels/pages/SearchEngine';
import NewHotel from "./hotels/pages/NewHotel";
import UserHotels from './hotels/pages/UserHotels';
import UpdateHotel from "./hotels/pages/UpdateHotel";
import Auth from "./users/pages/Auth";
import AllHotels from "./allHotels/pages/AllHotels";
import HotelInfo from "./allHotels/pages/HotelInfo";
import Users from "./users/pages/Users";
import ReservationInfo from './allHotels/pages/ReservationInfo';
import UserReservation from "./users/pages/UserReservation";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import WelcomePage from './welcomePage/welcome';
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";

// const SearchEngine = React.lazy(() => import('./allHotels/pages/SearchEngine'));
// const NewHotel = React.lazy(() => import('./hotels/pages/NewHotel'));
// const UserHotels = React.lazy(() => import('./hotels/pages/UserHotels'));
// const UpdateHotel = React.lazy(() => import('./hotels/pages/UpdateHotel'));
// const Auth = React.lazy(() => import('./users/pages/Auth'));
// const AllHotels = React.lazy(() => import('./allHotels/pages/AllHotels'));
// const HotelInfo = React.lazy(() => import('./allHotels/pages/HotelInfo'));
// const Users = React.lazy(() => import('./users/pages/Users'));
// const ReservationInfo = React.lazy(() => import('./allHotels/pages/ReservationInfo'));
// const UserReservation = React.lazy(() => import('./users/pages/UserReservation'));
// const WelcomePage = React.lazy(() => import('./welcomePage/welcome'));

const App = () => {
    const { token, login, logout, userId} = useAuth();

  let routes;

  if(token) {
    routes = (
        <Switch>
            <Route path="/" exact>
                < WelcomePage />
            </Route>
            <Route path="/search" exact>
                <SearchEngine />
            </Route>
            <Route path= "/allhotels" exact>
                <AllHotels />
            </Route>
            <Route path= "/allhotels/reservation/:hotelId" exact>
                <ReservationInfo />
            </Route>
            <Route path= "/allhotels/:hotelId" exact>
                <HotelInfo />
            </Route>
            <Route path= "/:userId/hotels" exact>
                <UserHotels />
            </Route>
            <Route path= "/hotels/uid/:userId" exact>
                <UserReservation />
            </Route>
            <Route path= "/hotels/new" exact>
                <NewHotel />
            </Route>
            <Route path= "/hotels/users" exact>
                <Users />
            </Route>
            <Route path="/hotels/:hotelId">
                <UpdateHotel />
            </Route>
            <Redirect to="/" />
        </Switch>

    );
  } else {
      routes = (
          <Switch>
              <Route path="/" exact>
                  < WelcomePage />
              </Route>
              <Route path="/search" exact>
                  <SearchEngine />
              </Route>
              <Route path= "/allhotels" exact>
                  <AllHotels />
              </Route>
              <Route path= "/allhotels/:hotelId" exact>
                  <HotelInfo />
              </Route>
              <Route path="/auth">
                  <Auth />
              </Route>
              <Redirect to = "/" />
          </Switch>

      );
  }
  return(
      <AuthContext.Provider value = {{
          isLoggedIn: !!token,
          token: token,
          userId: userId,
          login: login,
          logout: logout }}>
          <Router>
              <MainNavigation />
              <main>
                  <Suspense fallback = {<div className="center">
                      <LoadingSpinner />
                  </div>}>
                      {routes}
                  </Suspense>
              </main>
          </Router>
      </AuthContext.Provider>

  );
};

export default App;
