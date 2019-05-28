defmodule SpotifyWeb.Schema.Types do
  use Absinthe.Schema.Notation

  alias SpotifyWeb.Resolvers

  object :add_album_to_library_payload do
    @desc "Modified album after adding to the user's library"
    field :album, :album
  end

  object :album do
    interface :playable_collection

    field :id, non_null(:id)

    @desc "The artists of the album."
    field :artists, list_of(:simple_artist)

    field :primary_artist, :simple_artist, resolve: &Resolvers.Album.primary_artist/3

    @desc """
    A list of the genres used to classify the album. For example: "Prog Rock",
    "Post-Grunge". (If not yet classified, the array is empty.)
    """
    field :genres, list_of(:string)

    @desc """
    The field is present when getting an artist’s albums. Compared to type
    this field represents relationship between the artist and the album.
    """
    field :group, :album_group, resolve: &Resolvers.Album.group/3

    @desc "The cover art for the album in various sizes, widest first."
    field :images, list_of(:image)

    @desc "The label for the album."
    field :label, :string

    @desc """
    The name of the album. In case of an album takedown, the value may be an
    empty string
    """
    field :name, non_null(:string)

    @desc "Information about the release date of the album."
    field :release_date, :release_date, resolve: &Resolvers.Album.release_date/3

    @desc "The tracks of the album."
    field :tracks, :track_connection, resolve: &Resolvers.Album.tracks/3

    @desc "The type of album"
    field :type, non_null(:album_type)

    @desc """
    The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
    for the album.
    """
    field :uri, :string

    @desc "Whether or not the album is saved to the user's library"
    field :saved_to_library, non_null(:boolean), resolve: &Resolvers.Album.saved_to_library/3
  end

  object :album_connection do
    field :edges, list_of(:album_edge), resolve: &Resolvers.Connection.edges/3
    field :page_info, non_null(:page_info)
  end

  object :album_edge do
    field :node, non_null(:album), resolve: &Resolvers.Connection.node/3
  end

  object :artist do
    interface :playable_collection

    @desc """
    The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
    for the artist.
    """
    field :id, non_null(:id)

    @desc "A list of albums created by the artist."
    field :albums, non_null(:album_connection) do
      arg :limit, :integer, default_value: 50
      arg :offset, :integer, default_value: 0

      resolve &Resolvers.Artist.albums/3
    end

    @desc "Information about the followers of the artist."
    field :followers, :followers

    @desc """
    A list of the genres the artist is associated with. For example
    "Prog Rock", "Post-Grunge". (If not yet classified, the array is empty.)
    """
    field :genres, list_of(:string)

    @desc "A link to the Web API endpoint providing full details of the artist."
    field :href, non_null(:string)

    @desc "Images of the artist in various sizes, widest first."
    field :images, list_of(:image)

    @desc "The name of the artist."
    field :name, non_null(:string)

    @desc """
    The popularity of the artist. The value will be between 0 and 100, with 100
    being the most popular. The artist's popularity is calculated from the
    popularity of all the artist's tracks.
    """
    field :popularity, non_null(:integer)

    @desc "Top tracks for the artist."
    field :top_tracks, list_of(:full_track) do
      arg :limit, :integer, default_value: 10

      resolve &Resolvers.Artist.top_tracks/3
    end

    @desc """
    The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
    for the artist.
    """
    field :uri, :string

    @desc "Artists similar to the artist."
    field :related_artists, list_of(:artist), resolve: &Resolvers.Artist.related_artists/3
  end

  object :artist_connection do
    field :edges, list_of(:artist_edge), resolve: &Resolvers.Connection.edges/3
    field :page_info, non_null(:cursor_info), resolve: &Resolvers.Connection.page_info/3
  end

  object :artist_edge do
    field :node, non_null(:artist), resolve: &Resolvers.Connection.node/3
  end

  object :category do
    field :id, non_null(:id)
    field :icons, list_of(:image)
    field :name, non_null(:string)
  end

  object :category_connection do
    field :edges, list_of(:category_edge), resolve: &Resolvers.Connection.edges/3
    field :page_info, non_null(:cursor_info)
  end

  object :category_edge do
    field :node, non_null(:category), resolve: &Resolvers.Connection.node/3
  end

  object :cursor_info do
    @desc "The cursor used to find the next set of items."
    field :cursor, :string

    field :has_next_page, non_null(:boolean), resolve: &Resolvers.PageInfo.has_next_page/3

    field :has_previous_page, non_null(:boolean), resolve: &Resolvers.PageInfo.has_previous_page/3

    @desc """
    The maximum number of items in the response (as set in the query or by
    default)
    """
    field :limit, non_null(:integer)

    @desc "The total number of items available to return."
    field :total, non_null(:integer)
  end

  object :followers do
    @desc "The total number of followers."
    field :total, non_null(:integer)
  end

  object :full_track do
    interface :track

    field :id, non_null(:id)

    @desc "A simplified album object."
    field :album, non_null(:simple_album)

    @desc "An array of simplified artist objects."
    field :artists, list_of(:simple_artist)

    @desc """
    The disc number (usually 1 unless the album consists of more than one disc).
    """
    field :disc_number, non_null(:integer)

    @desc "The track length in milliseconds"
    field :duration, non_null(:integer), resolve: &Resolvers.Track.duration/3

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
  end

  object :image do
    @desc "The image height in pixels. If unknown, null is returned."
    field :height, :integer

    @desc "The source URL of the image."
    field :url, non_null(:string)

    @desc "The image width in pixels. If unknown, null is returned."
    field :width, :integer
  end

  object :page_info do
    @desc "Whether there is a next page of items."
    field :has_next_page, non_null(:boolean), resolve: &Resolvers.PageInfo.has_next_page/3

    @desc "Whether there is a previous page of items."
    field :has_previous_page, non_null(:boolean), resolve: &Resolvers.PageInfo.has_previous_page/3

    @desc """
    The maximum number of items in the response (as set in the query or default)
    """
    field :limit, non_null(:integer)

    @desc "The offset of the items returned (as set in the query or default)"
    field :offset, non_null(:integer)

    @desc "The total number of items returned for the page."
    field :total, non_null(:integer)
  end

  object :playlist do
    interface :playable_collection

    field :id, non_null(:id)
    field :collaborative, non_null(:boolean)
    field :images, list_of(:image)
    field :name, non_null(:string)
    field :owner, non_null(:user)
    field :public, non_null(:boolean)

    field :tracks, non_null(:playlist_track_connection), resolve: &Resolvers.Playlist.tracks/3

    @desc """
    The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
    for the playlist.
    """
    field :uri, :string
  end

  object :playlist_connection do
    field :edges, list_of(:playlist_edge), resolve: &Resolvers.Connection.edges/3
    field :page_info, non_null(:page_info)
  end

  object :playlist_edge do
    field :node, non_null(:playlist), resolve: &Resolvers.Connection.node/3
  end

  object :playlist_track_connection do
    field :edges, list_of(:playlist_track_edge), resolve: &Resolvers.Connection.edges/3
    field :page_info, non_null(:page_info), resolve: &Resolvers.Connection.page_info/3
  end

  object :playlist_track_edge do
    meta node: :track

    field :added_at, :string
    field :added_by, :user

    @desc "The track object."
    field :node, non_null(:track), resolve: &Resolvers.Connection.node/3
  end

  object :release_date do
    @desc """
    The date the album was first released, for example 1981. Depending on the
    precision, it might be shown as 1981-12, or 1981-12-15.
    """
    field :date, :string

    @desc "The precision with which the release date value is known."
    field :precision, :release_date_precision
  end

  object :saved_album_connection do
    field :edges, list_of(:saved_album_edge), resolve: &Resolvers.Connection.edges/3
    field :page_info, non_null(:page_info)
  end

  object :saved_album_edge do
    meta node: :album

    @desc "The date and time the album was saved."
    field :added_at, :string

    @desc "The album object."
    field :node, non_null(:album), resolve: &Resolvers.Connection.node/3
  end

  object :saved_track do
    interface :track

    field :id, non_null(:id)

    @desc "A simplified album object."
    field :album, non_null(:simple_album)

    @desc "An array of simplified artist objects."
    field :artists, list_of(:simple_artist)

    @desc """
    The disc number (usually 1 unless the album consists of more than one disc).
    """
    field :disc_number, non_null(:integer)

    @desc "The track length in milliseconds"
    field :duration, non_null(:integer), resolve: &Resolvers.Track.duration/3

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
  end

  object :saved_track_connection do
    field :edges, list_of(:saved_track_edge), resolve: &Resolvers.Connection.edges/3
    field :page_info, non_null(:page_info), resolve: &Resolvers.Connection.page_info/3
  end

  object :saved_track_edge do
    meta node: :track

    @desc "The date and time the track was saved."
    field :added_at, :string

    @desc "The track object."
    field :node, non_null(:saved_track), resolve: &Resolvers.Connection.node/3
  end

  @desc "Simplified representation of an album."
  object :simple_album do
    field :id, non_null(:id)

    @desc "The type of album"
    field :type, non_null(:album_type)

    @desc "The cover art for the album in various sizes, widest first."
    field :images, list_of(:image)

    @desc """
    The name of the album. In case of an album takedown, the value may be an
    empty string.
    """
    field :name, non_null(:string)
  end

  @desc "Simplified representation of an artist."
  object :simple_artist do
    field :id, non_null(:id)

    field :name, non_null(:string)
  end

  object :simple_track do
    interface :track

    field :id, non_null(:id)

    @desc "An array of simplified artist objects."
    field :artists, list_of(:simple_artist)

    @desc """
    The disc number (usually 1 unless the album consists of more than one disc).
    """
    field :disc_number, non_null(:integer)

    @desc "The track length in milliseconds"
    field :duration, non_null(:integer), resolve: &Resolvers.Track.duration/3

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
  end

  object :track_connection do
    field :edges, list_of(:track_edge), resolve: &Resolvers.Connection.edges/3
    field :page_info, non_null(:page_info), resolve: &Resolvers.Connection.page_info/3
  end

  object :track_edge do
    @desc "The track object."
    field :node, non_null(:track), resolve: &Resolvers.Connection.node/3
  end

  object :user do
    @desc """
    The [Spotify user ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
    for the user.
    """
    field :id, non_null(:id)

    @desc "The name displayed on the user’s profile. null if not available."
    field :display_name, :string

    @desc "The user’s profile image."
    field :images, list_of(:image)
  end

  object :viewer do
    @desc "The list of the current user's followed artists."
    field :followed_artists, :artist_connection do
      arg :limit, :integer, default_value: 50
      arg :after, :string

      resolve &Resolvers.Viewer.followed_artists/2
    end

    @desc "The list of the current user's owned or followed playlists"
    field :playlists, :playlist_connection do
      arg :limit, :integer
      arg :offset, :integer

      resolve &Resolvers.Viewer.playlists/2
    end

    @desc "Info about the user"
    field :user, :user, resolve: &Resolvers.Viewer.user/2

    @desc "The collection of saved albums in the current user's Spotify library."
    field :saved_albums, :saved_album_connection do
      arg :limit, :integer, default_value: 50
      arg :offset, :integer, default_value: 0

      resolve &Resolvers.Viewer.saved_albums/2
    end

    @desc "The collection of saved songs in the current user's Spotify library."
    field :saved_tracks, :saved_track_connection do
      arg :limit, :integer, default_value: 50
      arg :offset, :integer, default_value: 0

      resolve &Resolvers.Viewer.saved_tracks/2
    end
  end
end
