defmodule SpotifyWeb.Router do
  use SpotifyWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", SpotifyWeb do
    pipe_through :api
  end
end
