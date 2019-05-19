defmodule SpotifyWeb.Resolvers.Album do
  def new_releases(args, %{context: %{authentication: authentication}}) do
    args
    |> SpotifyClient.new_releases([{"Authentication", authentication}])
    |> case do
      {:ok, %HTTPoison.Response{body: body}} -> {:ok, body.albums}
      error -> error
    end
  end
end
