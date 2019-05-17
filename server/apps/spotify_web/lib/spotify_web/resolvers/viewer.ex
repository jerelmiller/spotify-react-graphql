defmodule SpotifyWeb.Resolvers.Viewer do
  def viewer(_, _), do: {:ok, %{}}

  def playlists(_, %{context: %{authorization: authorization}}) do
    SpotifyClient.playlists([], [{"Authorization", authorization}])
    |> case do
      {:ok, %HTTPoison.Response{body: body}} -> {:ok, body}
      error -> error
    end
  end
end
