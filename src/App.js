import React from 'react';
import logo from './logo.svg';
import {
    ApolloClient,
    ApolloProvider,
    createHttpLink,
    InMemoryCache
} from '@apollo/client';

import {setContext} from 'apollo-link-context';

import Pages from './pages'
import GlobalStyle from './components/GlobalStyle';

require('dotenv').config()
const uri = process.env.REACT_APP_API_URI
const httpLink = createHttpLink({uri})
const cache = new InMemoryCache()

const authLink = setContext((_, {headers}) => {
    return {
        headers: {
            ...headers,
            authorization: localStorage.getItem('token') || ''
        }
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
    resolvers: {},
    connectToDevTools: true
});

const data = {
    isLoggedIn: !!localStorage.getItem('token')
}

cache.writeData({data})
client.onResetStore(() => cache.writeData({data}))

const App = () => {
    return (
        <ApolloProvider client={client}>
            <GlobalStyle/>
            <Pages/>
        </ApolloProvider>
    )
}

export default App;
