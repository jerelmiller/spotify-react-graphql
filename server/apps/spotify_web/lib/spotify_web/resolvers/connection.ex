defmodule SpotifyWeb.Resolvers.Connection do
  def edges(%{items: items}, _, _), do: {:ok, Enum.reject(items, &is_nil/1)}
  def edges(_, _, _), do: {:error, "No items found"}

  def node(item, _, _) when is_nil(item), do: {:error, "Node is null"}
  def node(item, _, _), do: {:ok, item}

  def named_node(name) do
    fn parent, _, _ ->
      parent
      |> Map.fetch(name)
      |> case do
        :error -> {:error, "key does not exist"}
        result -> result
      end
    end
  end
end
