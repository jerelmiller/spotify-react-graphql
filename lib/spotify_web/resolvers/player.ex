defmodule SpotifyWeb.Resolvers.Player do
  alias SpotifyWeb.Resolvers.Helpers

  def play_collection(%{input: input}, res) do
    input.collection_uri
    |> Spotify.Client.play_collection(
      Map.delete(input, :collection_uri),
      Helpers.prepare_headers(res)
    )
    |> case do
      {:ok, _} -> {:ok, %{success: true}}
      _ -> {:ok, %{success: false}}
    end
  end

  def play_track(%{input: input}, res) do
    input.track
    |> Spotify.Client.play_track(
      Map.delete(input, :track),
      Helpers.prepare_headers(res)
    )
    |> case do
      {:ok, _} -> {:ok, %{success: true}}
      _ -> {:ok, %{success: false}}
    end
  end

  def shuffle(%{input: input}, res) do
    %{state: input.state, device_id: input.device_id}
    |> Spotify.Client.shuffle(Helpers.prepare_headers(res))
    |> case do
      {:ok, _} -> {:ok, %{success: true}}
      _ -> {:ok, %{success: false}}
    end
  end
end
