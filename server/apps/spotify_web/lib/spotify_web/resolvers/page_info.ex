defmodule SpotifyWeb.Resolvers.PageInfo do
  def limit(%{"limit" => limit}, _, _), do: {:ok, limit}

  def has_next_page(%{"next" => ""}, _, _), do: false
  def has_next_page(%{"next" => nil}, _, _), do: false
  def has_next_page(%{"next" => _}, _, _), do: true

  def has_previous_page(%{"previous" => ""}, _, _), do: false
  def has_previous_page(%{"previous" => nil}, _, _), do: false
  def has_previous_page(%{"previous" => _}, _, _), do: true

  def total(%{"total" => total}, _, _), do: {:ok, total}
  def offset(%{"offset" => offset}, _, _), do: {:ok, offset}
end
