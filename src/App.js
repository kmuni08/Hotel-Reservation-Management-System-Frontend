import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import SearchEngine from './allHotels/pages/SearchEngine';
import NewHotel from "./hotels/pages/NewHotel";
import UserHotels from './hotels/pages/UserHotels';
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UpdateHotel from "./hotels/pages/UpdateHotel";
import Auth from "./users/pages/Auth";
import AllHotels from "./allHotels/pages/AllHotels";
import { AuthContext } from './shared/context/auth-context';
import HotelInfo from "./allHotels/pages/HotelInfo";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const login = useCallback(() => {
      setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
       setIsLoggedIn(false);
  }, []);

  let routes;

  if(isLoggedIn) {
    routes = (
        <Switch>
            <Route path= "/:userId/hotels" exact>
                <UserHotels />
            </Route>
            <Route path= "/hotels/new" exact>
                <NewHotel />
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
      <AuthContext.Provider value = {{isLoggedIn: isLoggedIn, login: login, logout: logout }}>
          <Router>
              <MainNavigation />
              <main>
                  {routes}
              </main>
          </Router>
      </AuthContext.Provider>

  )
}

export default App;
