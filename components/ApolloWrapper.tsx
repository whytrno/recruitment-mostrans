"use client";

import {ApolloNextAppProvider,} from "@apollo/experimental-nextjs-app-support/ssr";
import {NextSSRApolloClient, NextSSRInMemoryCache, SSRMultipartLink} from 'apollo-boost';
import {ApolloLink} from 'apollo-link';
import {HttpLink} from 'apollo-link-http';

function makeClient() {
    const httpLink = new HttpLink({
        uri: "https://rickandmortyapi.com/graphql",
        fetchOptions: {cache: "no-store"},
    });

    return new NextSSRApolloClient({
        cache: new NextSSRInMemoryCache(),
        link:
            typeof window === "undefined"
                ? ApolloLink.from([
                    new SSRMultipartLink({
                        stripDefer: true,
                    }),
                    httpLink,
                ])
                : ApolloLink.from([
                    new HttpLink({
                        uri: "https://rickandmortyapi.com/graphql",
                        credentials: 'same-origin', // Adjust credentials according to your needs
                    }),
                ]),
    });
}


// you need to create a component to wrap your app in
export function ApolloWrapper({children}: React.PropsWithChildren) {
    return (
        <ApolloNextAppProvider makeClient={makeClient}>
            {children}
        </ApolloNextAppProvider>
    );
}