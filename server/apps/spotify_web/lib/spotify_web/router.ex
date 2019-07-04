defmodule SpotifyWeb.Router do
  use SpotifyWeb, :router

  pipeline :oauth do
    plug :accepts, ["html"]
  end

  pipeline :graphql do
    plug SpotifyWeb.Plug.Authorization
  end

  scope "/oauth", SpotifyWeb do
    pipe_through :oauth

    get "/init", OAuthController, :init
    get "/finalize", OAuthController, :finalize
  end

  scope "/graphql" do
    pipe_through :graphql

    forward "/", Absinthe.Plug,
      schema: SpotifyWeb.Schema,
      json_codec: Jason
  end

  if Mix.env() == :dev do
    scope "/graphiql" do
      pipe_through :graphql

      forward "/", Absinthe.Plug.GraphiQL,
        schema: SpotifyWeb.Schema,
        interface: :playground,
        socket: SpotifyWeb.UserSocket
    end
  end
end
