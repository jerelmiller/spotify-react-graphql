defmodule SpotifyWeb.Schema do
  use Absinthe.Schema

  alias SpotifyWeb.Resolvers.{Album, Artist, Category, Playlist, Viewer}

  import_types SpotifyWeb.Schema.Types
  import_types SpotifyWeb.Schema.Enums
  import_types SpotifyWeb.Schema.Interfaces
  import_types SpotifyWeb.Schema.InputObjects

  query do
    @desc "Get an album by its ID."
    field :album, :album do
      arg :id, non_null(:id)

      resolve &Album.find/2
    end

    field :artist, :artist do
      arg :id, non_null(:id)

      resolve &Artist.find/2
    end

    field :category, :category do
      arg :id, non_null(:id)

      resolve &Category.find/2
    end

    field :categories, :category_connection do
      arg :limit, :integer, default_value: 50
      arg :offset, :integer, default_value: 0

      resolve &Category.categories/2
    end

    field :new_releases, :album_connection do
      arg :limit, :integer, default_value: 50
      arg :offset, :integer, default_value: 0

      resolve &Album.new_releases/2
    end

    field :playlist, :playlist do
      arg :id, non_null(:id)

      resolve &Playlist.find/2
    end

    field :playlists_by_category, :playlist_connection do
      arg :category_id, non_null(:id)
      arg :limit, :integer, default_value: 50
      arg :offset, :integer, default_value: 0

      resolve &Playlist.by_category/2
    end

    @desc "Info about the current logged-in user"
    field :viewer, :viewer, resolve: &Viewer.viewer/2
  end

  mutation do
    @desc "Add an album to a user's library"
    field :add_album_to_library, :add_album_to_library_payload do
      arg :input, non_null(:add_album_to_library_input)

      resolve &Album.add_to_library/2
    end
  end

  def middleware(middleware, _field, _object) do
    [NewRelic.Absinthe.Middleware] ++ middleware
  end
end
