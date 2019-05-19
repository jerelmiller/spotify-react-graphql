defmodule SpotifyWeb.Resolvers.Playlist do
  def by_category(%{category_id: category_id} = args, %{context: %{authorization: authorization}}) do
    category_id
    |> SpotifyClient.playlists_by_category(Map.delete(args, :category_id), [
      {"Authorization", authorization}
    ])
    |> case do
      {:ok, %HTTPoison.Response{body: body}} -> {:ok, body.playlists}
      error -> error
    end
  end
end
