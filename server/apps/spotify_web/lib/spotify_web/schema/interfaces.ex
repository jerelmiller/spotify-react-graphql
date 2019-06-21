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

  interface :track do
    field :id, non_null(:id)

    @desc "An array of simplified artist objects."
    field :artists, list_of(:simple_artist)

    @desc """
    The disc number (usually 1 unless the album consists of more than one disc).
    """
    field :disc_number, non_null(:integer)

    @desc "The track length in milliseconds"
    field :duration, non_null(:integer)

    @desc """
    Whether or not the track has explicit lyrics (true = yes it does;
    false = no it does not OR unknown)
    """
    field :explicit, non_null(:boolean)

    @desc "The name of the track"
    field :name, non_null(:string)

    @desc """
    The number of the track. If an album has several discs, the track number is
    the number on the specified disc.
    """
    field :track_number, :integer

    @desc """
    The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
    for the track.
    """
    field :uri, :string

    resolve_type fn
      %{added_at: added_at}, _ when not is_nil(added_at) -> :saved_track
      %{album: album}, _ when not is_nil(album) -> :full_track
      _, _ -> :simple_track
    end
  end
end
