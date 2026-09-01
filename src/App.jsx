import { useState } from "react";
import { HttpLink, InMemoryCache, ApolloClient } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import Listings from "./components/Listings";
import { Route, Routes } from "react-router";
import SingUp from "./components/SingUp";
import { ToastContainer } from "react-toastify";
import { graphqlClient } from "./store/graph-client";
import Header from "./components/Header";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';



function App() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  return (
    <ApolloProvider client={graphqlClient}>

      <Header search={search} setSearch={setSearch} setPage={setPage} />


      <div>
        <h1>Popular apartments in the world  <ArrowRightAltIcon /> </h1>
        <Listings search={search} page={page} setPage={setPage} />
      </div>

      <ToastContainer />

    </ApolloProvider>
  );
}

export default App;