defmodule SpotifyClient do
  alias SpotifyClient.Config
  alias NewRelic.Instrumented.HTTPoison

  @oauth_uri "https://accounts.spotify.com"
  @api_uri "https://api.spotify.com/v1"

  def client_id, do: Config.client_id()
  def client_secret, do: Config.client_secret()

  def oauth_uri, do: @oauth_uri

  def add_album_to_library(id, headers \\ []) do
    "/me/albums"
    |> api_uri(%{ids: id})
    |> put("", headers)
  end

  def current_user(headers \\ []) do
    "/me"
    |> api_uri()
    |> get(headers)
  end

  def followed_artists(params \\ %{}, headers \\ []) do
    "/me/following"
    |> api_uri(Map.put(params, :type, "artist"))
    |> get(headers)
  end

  def generate_token(code, redirect_uri) do
    oauth_uri("/api/token")
    |> post(
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
    |> get(headers)
  end

  def albums_by_artist(artist_id, params \\ %{}, headers \\ []) do
    "/artists/#{artist_id}/albums"
    |> api_uri(params)
    |> get(headers)
  end

  def check_saved_albums(ids, headers \\ [])

  def check_saved_albums(id, headers) when not is_list(id),
    do: check_saved_albums([id], headers)

  def check_saved_albums(ids, headers) when is_list(ids) do
    "/me/albums/contains"
    |> api_uri(%{ids: Enum.join(ids, ",")})
    |> get(headers)
  end

  def find_artist(id, headers \\ []) do
    "/artists/#{id}"
    |> api_uri()
    |> get(headers)
  end

  def category(id, headers \\ []) do
    "/browse/categories/#{id}"
    |> api_uri()
    |> get(headers)
  end

  def categories(params \\ %{}, headers \\ []) do
    "/browse/categories"
    |> api_uri(params)
    |> get(headers)
  end

  def new_releases(params \\ %{}, headers \\ []) do
    "/browse/new-releases"
    |> api_uri(params)
    |> get(headers)
  end

  def playlists(params \\ %{}, headers \\ []) do
    "/me/playlists"
    |> api_uri(params)
    |> get(headers)
  end

  def playlists_by_category(category_id, params \\ %{}, headers \\ []) do
    "/browse/categories/#{category_id}/playlists"
    |> api_uri(params)
    |> get(headers)
  end

  def related_artists_for_artist(artist_id, headers \\ []) do
    "/artists/#{artist_id}/related-artists"
    |> api_uri()
    |> get(headers)
  end

  def saved_albums(params \\ %{}, headers \\ []) do
    "/me/albums"
    |> api_uri(Map.put(params, :aggregate_tracks, true))
    |> get(headers)
  end

  def top_tracks_by_artist(artist_id, headers \\ []) do
    "/artists/#{artist_id}/top-tracks"
    |> api_uri(%{market: "from_token"})
    |> get(headers)
  end

  def tracks_by_album(album_id, headers \\ []) do
    "/albums/#{album_id}/tracks"
    |> api_uri()
    |> get(headers)
  end

  def uri(path, nil), do: path
  def uri(path, params) when map_size(params) == 0, do: path
  def uri(path, params), do: "#{path}?#{query_params(params)}"

  def api_uri(path, params \\ nil), do: @api_uri <> uri(path, params)
  def oauth_uri(path, params \\ nil), do: @oauth_uri <> uri(path, params)

  def query_params(params) when is_map(params), do: URI.encode_query(params)

  defp get(uri, headers) do
    uri
    |> HTTPoison.get(headers)
    |> parse_response()
  end

  def post(uri, body, headers) do
    uri
    |> HTTPoison.post(body, headers)
    |> parse_response()
  end

  def put(uri, body, headers) do
    uri
    |> HTTPoison.put(body, headers)
    |> parse_response()
  end

  defp parse_response({:ok, %{status_code: 200, body: ""} = response}) do
    {:ok, response}
  end

  defp parse_response({:ok, %{status_code: 200} = response}) do
    {:ok,
     response
     |> Map.update!(:body, &Jason.decode!(&1, keys: :atoms))}
  end

  defp parse_response({:ok, %{body: ""} = response}) do
    {:error, response}
  end

  defp parse_response({:ok, response}) do
    {:error,
     response
     |> Map.update!(:body, &Jason.decode!(&1, keys: :atoms))}
  end

  defp parse_response(response), do: response
end
