defmodule SpotifyClient do
  alias SpotifyClient.Config
  alias SpotifyClient.Client

  @oauth_uri "https://accounts.spotify.com"
  @api_uri "https://api.spotify.com/v1"

  def client_id, do: Config.client_id()
  def client_secret, do: Config.client_secret()

  def oauth_uri, do: @oauth_uri

  def generate_token(code, redirect_uri) do
    oauth_uri("/api/token")
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
  end

  def album(id, headers \\ []) do
    "/albums/#{id}"
    |> api_uri()
    |> Client.get(headers)
  end

  def artist(id, headers \\ []) do
    "/artists/#{id}"
    |> api_uri()
    |> Client.get(headers)
  end

  def playlists(params \\ %{}, headers \\ []) do
    "/me/playlists"
    |> api_uri(params)
    |> Client.get(headers)
  end

  def categories(params \\ %{}, headers \\ []) do
    "/browse/categories"
    |> api_uri(params)
    |> Client.get(headers)
  end

  defp uri(path, nil), do: path
  defp uri(path, %{}), do: path
  defp uri(path, params), do: "#{path}?#{query_params(params)}"

  defp api_uri(path, params \\ nil), do: @api_uri <> uri(path, params)
  defp oauth_uri(path, params \\ nil), do: @oauth_uri <> uri(path, params)

  defp query_params(params) when is_map(params), do: URI.encode_query(params)
end
