defmodule SpotifyWeb.Router do
  use SpotifyWeb, :router

  pipeline :oauth do
    plug :accepts, ["html"]
  end

  scope "/oauth", SpotifyWeb do
    pipe_through :oauth

    get "/init", OAuthController, :init
    get "/finalize", OAuthController, :finalize
  end

  forward "/graphql", Absinthe.Plug, schema: SpotifyWeb.Schema, json_codec: Jason
end
