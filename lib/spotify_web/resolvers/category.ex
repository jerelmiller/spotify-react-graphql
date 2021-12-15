defmodule SpotifyWeb.Resolvers.Category do
  alias SpotifyWeb.Resolvers.Helpers

  def find(%{id: id}, %{context: %{authorization: authorization}}) do
    id
    |> Spotify.Client.category([{"Authorization", authorization}])
    |> Helpers.handle_response()
  end

  def categories(args, %{context: %{authorization: authorization}}) do
    args
    |> Spotify.Client.categories([{"Authorization", authorization}])
    |> Helpers.handle_response(fn %{categories: categories} -> categories end)
  end
end
