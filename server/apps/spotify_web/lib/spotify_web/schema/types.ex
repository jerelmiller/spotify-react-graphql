defmodule SpotifyWeb.Schema.Types do
  use Absinthe.Schema.Notation

  alias SpotifyWeb.Resolvers

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
