import { createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ApolloClient } from "@apollo/client";
import { InMemoryCache } from "@apollo/client";

const httpLink = createHttpLink({
    uri: 'https://react-groups-final-project-backend.onrender.com/graphql'
});

const authLink = setContext((_, { headers }) => {
    const token = JSON.parse(localStorage.getItem("auth"))?.state?.accessToken

    return {

        headers: { ...headers, authorization: token ? `Bearer ${token}` : "" }
    }
});

export const graphqlClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})