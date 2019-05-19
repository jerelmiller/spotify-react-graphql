defmodule SpotifyWeb.Resolvers.Viewer do
  def viewer(_, _), do: {:ok, %{}}

  def saved_albums(args, %{context: %{authorization: authorization}}) do
    args
    |> SpotifyClient.saved_albums([{"Authorization", authorization}])
    |> case do
      {:ok, %HTTPoison.Response{body: body}} -> {:ok, body}
      error -> error
    end
  end

  def playlists(args, %{context: %{authorization: authorization}}) do
    args
    |> SpotifyClient.playlists([{"Authorization", authorization}])
    |> case do
      {:ok, %HTTPoison.Response{body: body}} -> {:ok, body}
      error -> error
    end
  end
end
