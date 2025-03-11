import React, { Component } from 'react'
import EntryPage  from './Pages/EntryPage/EntryPage.jsx'
import LariatPage  from './Pages/LariatPage/LariatPage.jsx'

// import Head from "./SimpleComps/Head.jsx"

import {
    HashRouter,
    Routes,
    Route,
} from  "react-router";


class App extends Component {
  render(){
    return(
        <>
          <HashRouter>
            <Routes>
              <Route
                  exact
                  path="/"
                  element={
                <>
                  <EntryPage style={{position: "fixed"}}/>
                </>
                          }/>
              <Route
                  exact
                  path="/lariat"
                  element={
                <>
                  <LariatPage />
                </>
                          }/>
            </Routes>
          </HashRouter>
        </>
      )
  }
}

export default App
