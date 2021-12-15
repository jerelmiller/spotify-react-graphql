defmodule SpotifyWeb.PageController do
  use SpotifyWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
