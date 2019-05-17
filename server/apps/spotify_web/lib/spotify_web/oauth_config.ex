defmodule SpotifyWeb.OAuthConfig do
  def client_id, do: config(:client_id)
  def client_secret, do: config(:client_secret)
  def redirect_uri, do: config(:redirect_uri)
  def client_uri, do: config(:client_uri)

  defp config(key),
    do: Application.get_env(:spotify_web, __MODULE__) |> Keyword.get(key)
end
