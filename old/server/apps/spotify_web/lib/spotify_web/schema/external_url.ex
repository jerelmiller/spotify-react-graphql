defmodule SpotifyWeb.Schema.ExternalUrl do
  use SpotifyWeb.Schema.Definition

  object :external_url do
    @desc """
    The type of the URL, for example:

    - "spotify" - The [Spotify URL](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
    for the object.
    """
    field :type, non_null(:string)

    @desc "An external, public URL to the object."
    field :url, non_null(:string)
  end

  def list(%{external_urls: nil}, _, _), do: {:ok, []}

  def list(%{external_urls: external_urls}, _, _) do
    {:ok, Enum.map(external_urls, &to_external_url/1)}
  end

  defp to_external_url({type, url}), do: %{type: type, url: url}
end
