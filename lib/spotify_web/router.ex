defmodule SpotifyWeb.Router do
  use SpotifyWeb, :router

  pipeline :oauth do
    plug :accepts, ["html"]
  end

  pipeline :graphql do
    plug SpotifyWeb.Plug.Authorization
  end

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_live_flash
    plug :put_root_layout, {SpotifyWeb.LayoutView, :root}
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", SpotifyWeb do
    pipe_through :browser

    get "/", PageController, :index
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

  # Enables LiveDashboard only for development
  #
  # If you want to use the LiveDashboard in production, you should put
  # it behind authentication and allow only admins to access it.
  # If your application does not have an admins-only section yet,
  # you can use Plug.BasicAuth to set up some basic authentication
  # as long as you are also using SSL (which you should anyway).
  if Mix.env() in [:dev, :test] do
    import Phoenix.LiveDashboard.Router

    scope "/" do
      pipe_through :browser

      live_dashboard "/dashboard", metrics: SpotifyWeb.Telemetry
    end
  end

  # Enables the Swoosh mailbox preview in development.
  #
  # Note that preview only shows emails that were sent by the same
  # node running the Phoenix server.
  if Mix.env() == :dev do
    scope "/dev" do
      pipe_through :browser

      forward "/mailbox", Plug.Swoosh.MailboxPreview
    end
  end
end
