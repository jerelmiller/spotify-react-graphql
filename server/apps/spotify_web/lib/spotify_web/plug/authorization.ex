defmodule SpotifyWeb.Plug.Authorization do
  @behaviour Plug.Conn

  import Plug.Conn

  def init(opts), do: opts

  def call(conn, _) do
    Absinthe.Plug.put_options(
      conn,
      context: %{authorization: get_req_header(conn, "authorization")}
    )
  end
end
