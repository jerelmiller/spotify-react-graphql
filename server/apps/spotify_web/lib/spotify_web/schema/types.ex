defmodule SpotifyWeb.Schema.Types do
  use Absinthe.Schema.Notation

  alias SpotifyWeb.Resolvers

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
    field :group, :album_group

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
    field :release_date, :release_date

    @desc "The type of album"
    field :type, non_null(:album_type)

    @desc """
    The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
    for the album.
    """
    field :uri, :string

    @desc "Whether or not the album is saved to the user's library"
    field :saved_to_library, non_null(:boolean)
  end

  object :album_connection do
    field :edges, list_of(:album_edge), resolve: &Resolvers.Connection.edges/3
    field :page_info, non_null(:page_info)
  end

  object :album_edge do
    field :node, non_null(:album), resolve: &Resolvers.Connection.node/3
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

  object :full_track do
    interface :track

    field :id, non_null(:id)
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
    field :id, non_null(:id)
    field :collaborative, non_null(:boolean)
    field :images, list_of(:image)
    field :name, non_null(:string)
    field :owner, non_null(:user)
    field :public, non_null(:boolean)

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
    field :page_info, non_null(:page_info)
  end

  object :playlist_track_edge do
    field :added_at, :string
    field :added_by, :user

    @desc "The track object."
    field :node, non_null(:track)
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

  object :saved_track do
    interface :track

    field :id, non_null(:id)
  end

  @desc "Simplified representation of an artist."
  object :simple_artist do
    field :id, non_null(:id)

    field :name, non_null(:string)
  end

  object :simple_track do
    interface :track

    field :id, non_null(:id)
  end

  object :track_connection do
    field :edges, list_of(:track_edge), resolve: &Resolvers.Connection.edges/3
    field :page_info, non_null(:page_info)
  end

  object :track_edge do
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
    @desc "The list of the current user's owned or followed playlists"
    field :playlists, :playlist_connection do
      arg :limit, :integer
      arg :offset, :integer

      resolve &Resolvers.Viewer.playlists/2
    end

    @desc "Info about the user"
    field :user, :user
  end
end
