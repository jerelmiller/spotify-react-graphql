defmodule SpotifyClient.Client do
  alias NewRelic.Instrumented.HTTPoison

  def get(uri, headers \\ [], options \\ []) do
    uri
    |> HTTPoison.get(headers, options)
    |> parse_response(:json)
  end

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
