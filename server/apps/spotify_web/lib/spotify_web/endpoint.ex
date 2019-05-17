defmodule SpotifyWeb.Endpoint do
  use Phoenix.Endpoint, otp_app: :spotify_web

  socket "/socket", SpotifyWeb.UserSocket,
    websocket: true,
    longpoll: false

  # Code reloading can be explicitly enabled under the
  # :code_reloader configuration of your endpoint.
  if code_reloading? do
    plug Phoenix.CodeReloader
  end

  plug Plug.RequestId
  plug Plug.Logger

  plug Plug.Parsers,
    parsers: [:urlencoded, :multipart, :json, Absinthe.Plug.Parser],
    pass: ["*/*"],
    json_decoder: Phoenix.json_library()

  plug Plug.MethodOverride
  plug Plug.Head

  plug Absinthe.Plug,
    schema: SpotifyWeb.Schema

  plug SpotifyWeb.Router
end
