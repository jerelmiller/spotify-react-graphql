defmodule SpotifyWeb.Resolvers.Album do
  alias SpotifyWeb.Resolvers.Helpers

  def find(%{id: id}, %{context: %{authorization: authorization}}) do
    id
    |> SpotifyClient.album([{"Authorization", authorization}])
    |> Helpers.handle_response()
  end

  def new_releases(args, %{context: %{authorization: authorization}}) do
    args
    |> SpotifyClient.new_releases([{"Authorization", authorization}])
    |> Helpers.handle_response(fn %{albums: albums} -> albums end)
  end

  def group(%{album_group: group}, _, _), do: {:ok, group}

  def primary_artist(%{artists: artists}, _, __), do: {:ok, List.first(artists)}

  def release_date(%{release_date: date, release_date_precision: precision}, _, _),
    do: {:ok, %{date: date, precision: precision}}

  def saved_to_library(%{id: id}, _, %{context: %{authorization: authorization}}) do
    id
    |> SpotifyClient.check_saved_albums([{"Authorization", authorization}])
    |> Helpers.handle_response(fn [contains] -> contains end)
  end

  def tracks(%{id: id}, _, %{context: %{authorization: authorization}}) do
    id
    |> SpotifyClient.tracks_by_album([{"Authorization", authorization}])
    |> Helpers.handle_response()
  end
end
