defmodule SpotifyWeb.Schema.Interfaces do
  use Absinthe.Schema.Notation

  interface :playable_collection do
    @desc "Images associated with the playable collection"
    field :images, list_of(:image)

    @desc """
    The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
    for the playlist.
    """
    field :uri, :string

    resolve_type fn %{uri: uri} ->
      uri
      |> String.split(':')
      |> Enum.at(1)
      |> String.to_existing_atom()
    end
  end
end
