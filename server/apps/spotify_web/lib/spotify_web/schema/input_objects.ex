defmodule SpotifyWeb.Schema.InputObjects do
  use Absinthe.Schema.Notation

  input_object :add_album_to_library_input do
    @desc "Album id of the album that should be added to the user's library"
    field :album_id, non_null(:id)
  end

  input_object :play_collection_input do
    @desc "Collection URI to play. Must be part of a PlayableCollection"
    field :collection_uri, non_null(:string)

    @desc "The device in which to play the album"
    field :device_id, :id
  end

  input_object :play_track_input do
    @desc "Track URI to play"
    field :track, non_null(:string)

    @desc "The device in which to play the track"
    field :device_id, :id

    @desc """
    Spotify URI of the context to play. Valid contexts are albums, artists,
    playlists. Example: 'spotify:album:1Je1IMUlBXcx1Fz0WE7oPT'
    """
    field :context_uri, :string
  end

  input_object :refresh_session_input do
    @desc "The token used to previously authenticate the request"
    field :token, non_null(:string)
  end
end
