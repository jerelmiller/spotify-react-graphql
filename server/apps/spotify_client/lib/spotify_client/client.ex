defmodule SpotifyClient.Client do
  alias NewRelic.Instrumented.HTTPoison

  @oauth_uri "https://accounts.spotify.com"
  @api_uri "https://api.spotify.com/v1"

  def uri(:auth, path), do: @oauth_uri <> path
  def uri(:api, path), do: @api_uri <> path

  def post(uri, body, headers \\ [], options \\ []) do
    uri
    |> HTTPoison.post(body, headers, options)
    |> parse_response(:json)
  end

  defp parse_response({:ok, %{status_code: 200} = response}, :json) do
    {:ok,
     response
     |> Map.update!(:body, &Jason.decode!(&1))}
  end

  defp parse_response({:ok, response}, :json) do
    {:error,
     response
     |> Map.update!(:body, &Jason.decode!(&1))}
  end

  defp parse_response(response, _), do: response
end
