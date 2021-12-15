defmodule SpotifyWeb.Resolvers.PageInfo do
  def has_next_page(%{next: ""}, _, _), do: {:ok, false}
  def has_next_page(%{next: nil}, _, _), do: {:ok, false}
  def has_next_page(%{next: _}, _, _), do: {:ok, true}

  def has_next_page(_, _, _),
    do: {:error, "Unable to determine if has next page"}

  def has_previous_page(%{previous: ""}, _, _), do: {:ok, false}
  def has_previous_page(%{previous: nil}, _, _), do: {:ok, false}
  def has_previous_page(%{previous: _}, _, _), do: {:ok, true}

  def has_previous_page(_, _, _),
    do: {:error, "Unable to determine if has previous page"}
end
