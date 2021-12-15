defmodule SpotifyWeb.Resolvers.FeaturedPlaylistConnection do
  def title(%{message: title}, _, _), do: {:ok, title}

  def edges(%{playlists: %{items: items}}, _, _),
    do: {:ok, Enum.reject(items, &is_nil/1)}

  def page_info(%{playlists: playlists}, _, _),
    do: {:ok, Map.delete(playlists, :items)}
end
