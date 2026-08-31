import { HttpLink, InMemoryCache, ApolloClient } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import Listings from "./components/Listings";
import { Route, Routes } from "react-router";
import SingUp from "./components/SingUp";
import { ToastContainer } from "react-toastify";
import { graphqlClient } from "./store/graph-client";
import Header from "./components/Header";



function App() {

  return (
    <ApolloProvider client={graphqlClient}>

      <Header />
      {/* <div>
        <Routes>
          <Route path="/" element={<Listings />} />
          <Route path="/sing-up" element={<SingUp />} />
        </Routes>
        <ToastContainer />
      </div> */}
    </ApolloProvider>
  );
}

export default App;