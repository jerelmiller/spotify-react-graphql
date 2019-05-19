defmodule SpotifyWeb.Resolvers.Category do
  def categories(args, %{context: %{authorization: authorization}}) do
    args
    |> SpotifyClient.categories([{"Authorization", authorization}])
    |> case do
      {:ok, %HTTPoison.Response{body: body}} -> {:ok, body.categories}
      error -> error
    end
  end
end
