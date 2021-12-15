defmodule SpotifyWeb.OAuthConfig do
  def redirect_uri, do: config(:redirect_uri)
  def client_uri, do: config(:client_uri)

  defp config(key),
    do: Application.get_env(:spotify, __MODULE__) |> Keyword.get(key)
end
