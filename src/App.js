import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Users from './users/pages/Users';
import Map from './map/pages/Map';
import SearchEngine from './searchengine/pages/SearchEngine';
import NewHotel from "./hotels/pages/NewHotel";
import MainNavigation from "./shared/components/Navigation/MainNavigation";

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
               <Route path= "/hotels" exact>
                   <NewHotel />
               </Route>
               <Route path= "/hotels/new" exact>
                   <NewHotel />
               </Route>
               <Redirect to="/" />
           </Switch>
       </main>
      </Router>
  )
}

export default App;
