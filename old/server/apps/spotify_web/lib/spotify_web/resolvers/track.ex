defmodule SpotifyWeb.Resolvers.Track do
  def duration(%{duration_ms: duration}, _, _), do: {:ok, duration}
end
