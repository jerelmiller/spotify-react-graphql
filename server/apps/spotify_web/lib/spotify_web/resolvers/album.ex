defmodule SpotifyWeb.Resolvers.Album do
  def new_releases(args, %{context: %{authorization: authorization}}) do
    args
    |> SpotifyClient.new_releases([{"Authorization", authorization}])
    |> case do
      {:ok, %HTTPoison.Response{body: body}} -> {:ok, body.albums}
      error -> error
    end
  end

  def primary_artist(%{albums: albums}, _, __), do: List.first(albums)
end
