defmodule SpotifyWeb.Resolvers.PlaylistConnection do
  def edges(%{"items" => items}, _, _), do: {:ok, Enum.map(items, &%{"node" => &1})}

  def node(%{"node" => playlist}, _, _), do: {:ok, playlist}
end
