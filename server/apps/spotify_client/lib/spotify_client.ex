defmodule SpotifyClient do
  alias SpotifyClient.Config
  alias SpotifyClient.Client

  @oauth_uri "https://accounts.spotify.com"

  def client_id, do: Config.client_id()
  def client_secret, do: Config.client_secret()

  def oauth_uri, do: @oauth_uri

  def generate_token(code, redirect_uri) do
    Client.uri(:auth, "/api/token")
    |> Client.post(
      {:form,
       [
         grant_type: "authorization_code",
         code: code,
         redirect_uri: redirect_uri,
         client_id: client_id(),
         client_secret: client_secret()
       ]},
      [{"Content-type", "application/x-www-form-urlencoded"}]
    )
    |> case do
      {:ok, response} -> {:ok, IO.inspect(response)}
      error -> error
    end
  end
end
