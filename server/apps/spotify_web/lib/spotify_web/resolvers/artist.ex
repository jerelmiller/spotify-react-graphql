defmodule SpotifyWeb.Resolvers.Artist do
  alias SpotifyWeb.Resolvers.Helpers

  def albums(%{id: id}, args, %{context: %{authorization: authorization}}) do
    id
    |> SpotifyClient.albums_by_artist(args, [{"Authorization", authorization}])
    |> Helpers.handle_response()
  end

  def find(%{id: id}, %{context: %{authorization: authorization}}) do
    id
    |> SpotifyClient.find_artist([{"Authorization", authorization}])
    |> Helpers.handle_response()
  end

  def related_artists(%{id: id}, _, res) do
    id
    |> SpotifyClient.related_artists_for_artist(Helpers.prepare_headers(res))
    |> Helpers.handle_response(fn %{artists: artists} -> artists end)
  end

  def top_tracks(%{id: id}, %{limit: limit}, %{context: %{authorization: authorization}}) do
    id
    |> SpotifyClient.top_tracks_by_artist([{"Authorization", authorization}])
    |> Helpers.handle_response(fn %{tracks: tracks} -> Enum.take(tracks, limit) end)
  end
end
