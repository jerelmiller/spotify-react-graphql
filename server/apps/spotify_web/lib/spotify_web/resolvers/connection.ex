defmodule SpotifyWeb.Resolvers.Connection do
  def edges(%{items: items}, _, _), do: {:ok, Enum.reject(items, &is_nil/1)}
  def edges(_, _, _), do: {:error, "No items found"}

  def node(item, _, _) when is_nil(item), do: {:error, "Node is null"}

  def node(item, _, resolution) do
    resolution.schema
    |> Absinthe.Schema.lookup_type(resolution.parent_type.identifier)
    |> Absinthe.Type.meta()
    |> case do
      %{node: name} -> {:ok, Map.get(item, name)}
      _ -> {:ok, item}
    end
  end
end
