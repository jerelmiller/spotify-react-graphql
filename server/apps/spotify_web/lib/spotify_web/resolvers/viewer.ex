defmodule SpotifyWeb.Resolvers.Viewer do
  alias SpotifyWeb.Resolvers.Helpers

  def viewer(_, _), do: {:ok, %{}}

  def followed_artists(args, res) do
    args
    |> SpotifyClient.followed_artists(Helpers.prepare_headers(res))
    |> Helpers.handle_response(fn %{artists: artists} -> artists end)
  end

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

  def user(_, %{context: %{authorization: authorization}}) do
    SpotifyClient.current_user([{"Authorization", authorization}])
    |> Helpers.handle_response()
  end
end
