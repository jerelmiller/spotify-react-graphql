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

  def primary_artist(%{albums: albums}, _, __), do: List.first(albums)
end
