defmodule SpotifyClient.Client do
  alias NewRelic.Instrumented.HTTPoison

  @oauth_uri "https://accounts.spotify.com"
  @api_uri "https://api.spotify.com/v1"

  def uri(:auth, path), do: @oauth_uri <> path
  def uri(:api, path), do: @api_uri <> path

  def post(uri, body, headers \\ [], options \\ []),
    do: HTTPoison.post(uri, body, headers, options)
end
