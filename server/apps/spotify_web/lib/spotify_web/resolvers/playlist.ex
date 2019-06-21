defmodule SpotifyWeb.Resolvers.Playlist do
  alias SpotifyWeb.Resolvers.Helpers

  def by_category(%{category_id: category_id} = args, %{
        context: %{authorization: authorization}
      }) do
    category_id
    |> SpotifyClient.playlists_by_category(Map.delete(args, :category_id), [
      {"Authorization", authorization}
    ])
    |> case do
      {:ok, %HTTPoison.Response{body: body}} -> {:ok, body.playlists}
      error -> error
    end
  end

  def find(%{id: id}, res) do
    id
    |> SpotifyClient.find_playlist(Helpers.prepare_headers(res))
    |> Helpers.handle_response()
  end

  def tracks(%{id: id}, args, res) do
    id
    |> SpotifyClient.tracks_by_playlist(args, Helpers.prepare_headers(res))
    |> Helpers.handle_response()
  end

  def featured(args, %{context: %{authorization: authorization}}) do
    args
    |> SpotifyClient.featured_playlists(Authorization: authorization)
    |> Helpers.handle_response()
  end
end
