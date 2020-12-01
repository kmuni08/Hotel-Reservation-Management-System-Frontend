import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Users from './users/pages/Users';
import Map from './map/pages/Map';
import SearchEngine from './searchengine/pages/SearchEngine';
import NewHotel from "./hotels/pages/NewHotel";
import UserHotels from './hotels/pages/UserHotels';
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UpdateHotel from "./hotels/pages/UpdateHotel";

const App = () => {
  return(
      <Router>
       <MainNavigation />
       <main>
           <Switch>
               <Route path="/" exact>
                   <Map />
               </Route>
               <Route path="/searchengine" exact>
                   <SearchEngine />
               </Route>
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
       </main>
      </Router>
  )
}

export default App;
