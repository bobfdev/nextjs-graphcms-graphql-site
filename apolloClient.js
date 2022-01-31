import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://api-us-east-1.graphcms.com/v2/ckz0irj4k2fcz01z63jabfh3x/master",
    cache: new InMemoryCache(),
});

export default client;