defmodule SpotifyWeb.Schema.Interfaces do
  use Absinthe.Schema.Notation

  interface :playable_collection do
    field :id, non_null(:id)
    field :collaborative, non_null(:boolean)
    field :images, list_of(:image)
    field :name, non_null(:string)
    field :owner, non_null(:user)
    field :public, non_null(:boolean)
    field :tracks, non_null(:playlist_track_connection)

    @desc """
    The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
    for the playlist.
    """
    field :uri, :string
  end
end
