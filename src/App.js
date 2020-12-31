import React from 'react';
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
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UpdateHotel from "./hotels/pages/UpdateHotel";
import Auth from "./users/pages/Auth";
import AllHotels from "./allHotels/pages/AllHotels";
import HotelInfo from "./allHotels/pages/HotelInfo";
import Users from "./users/pages/Users";
import ReservationInfo from './allHotels/pages/ReservationInfo';

const App = () => {
    const { token, login, logout, userId } = useAuth();

  let routes;

  if(token) {
    routes = (
        <Switch>
            <Route path="/" exact>
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
            <Route path= "/hotels/new" exact>
                <NewHotel />
            </Route>
            <Route path= "/hotels/users" exact>
                <Users />
            </Route>
            <Route path="/hotels/:hotelId">
                <UpdateHotel />
            </Route>
            <Redirect to="/hotels/users" />
        </Switch>

    );
  } else {
      routes = (
          <Switch>
              <Route path="/" exact>
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
              <Redirect to = "/auth" />
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
                  {routes}
              </main>
          </Router>
      </AuthContext.Provider>

  );
};

export default App;
