defmodule SpotifyClient do
  alias SpotifyClient.Config

  @oauth_uri "https://accounts.spotify.com"

  def client_id, do: Config.client_id()
  def client_secret, do: Config.client_secret()

  def oauth_uri, do: @oauth_uri
end
