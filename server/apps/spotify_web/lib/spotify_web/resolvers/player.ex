defmodule SpotifyWeb.Resolvers.Player do
  alias SpotifyWeb.Resolvers.Helpers

  def play_collection(%{input: input}, res) do
    input.collection_uri
    |> SpotifyClient.play_collection(
      Map.delete(input, :collection_uri),
      Helpers.prepare_headers(res)
    )
    |> case do
      {:ok, _} -> {:ok, %{success: true}}
      _ -> {:ok, %{success: false}}
    end
  end
end
