defmodule SpotifyClient do
  alias SpotifyClient.Config
  alias NewRelic.Instrumented.HTTPoison

  @oauth_uri "https://accounts.spotify.com"
  @api_uri "https://api.spotify.com/v1"

  def client_id, do: Config.client_id()
  def client_secret, do: Config.client_secret()

  def oauth_uri, do: @oauth_uri

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

  def artist(id, headers \\ []) do
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

  defp parse_response({:ok, %{status_code: 200} = response}) do
    {:ok,
     response
     |> Map.update!(:body, &Jason.decode!(&1, keys: :atoms))}
  end

  defp parse_response({:ok, response}) do
    {:error,
     response
     |> Map.update!(:body, &Jason.decode!(&1, keys: :atoms))}
  end

  defp parse_response(response), do: response
end
