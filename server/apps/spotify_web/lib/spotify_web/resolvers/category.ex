defmodule SpotifyWeb.Resolvers.Category do
  def find(%{id: id}, %{context: %{authorization: authorization}}) do
    id
    |> SpotifyClient.category([{"Authorization", authorization}])
    |> case do
      {:ok, %HTTPoison.Response{body: body}} -> {:ok, body}
      error -> error
    end
  end

  def categories(args, %{context: %{authorization: authorization}}) do
    args
    |> SpotifyClient.categories([{"Authorization", authorization}])
    |> case do
      {:ok, %HTTPoison.Response{body: body}} -> {:ok, body.categories}
      error -> error
    end
  end
end
