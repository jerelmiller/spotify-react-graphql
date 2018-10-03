# Spotify React + GraphQL

Web player for the Spotify Web and Connect APIs. I wanted to play around with
Apollo Server by using it on top of an established REST API.

**client**

The frontend React app powered by Apollo.

**server**

The backend Apollo server. This layers a GraphQL API on top of the Spotify APIs.

## Running the app

Running the frontend:
 
```sh
$ cd client
$ yarn
$ yarn start
```

Running the backend:

```sh
$ cd server
$ yarn
$ cp .env.sample .env
$ yarn start
```

You will need to get your Spotify credentials through the [Spotify developer
dashboard](https://developer.spotify.com/dashboard/applications). Update the
`.env` file to use the appropriate credentials.
