defmodule SpotifyWeb.Resolvers.Connection do
  def edges(%{items: items}, _, %{schema: schema, definition: definition}) do
    {:ok,
     Enum.reject(items, fn
       nil ->
         true

       item ->
         item
         |> node_for_item(schema, definition.schema_node.type)
         |> is_nil()
     end)}
  end

  def edges(_, _, _), do: {:error, "No items found"}

  def node(item, _, _) when is_nil(item), do: {:error, "Node is null"}

  def node(item, _, %{schema: schema, parent_type: parent_type}) do
    {:ok, node_for_item(item, schema, parent_type.identifier)}
  end

  def page_info(connection, _, _), do: {:ok, Map.delete(connection, :items)}

  defp node_for_item(item, schema, type) do
    schema
    |> Absinthe.Schema.lookup_type(type)
    |> Absinthe.Type.meta()
    |> case do
      %{node: name} -> Map.get(item, name)
      _ -> item
    end
  end
end
