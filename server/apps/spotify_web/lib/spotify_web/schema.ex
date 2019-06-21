defmodule SpotifyWeb.Schema do
  use Absinthe.Schema

  alias SpotifyWeb.Resolvers.{
    Album,
    Artist,
    Auth,
    Category,
    Player,
    Playlist,
    Viewer
  }

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

    @desc "Get a list of Spotify featured playlists"
    field :featured_playlists, :featured_playlist_connection do
      arg :limit, :integer, default_value: 50
      arg :offset, :integer, default_value: 0

      resolve &Playlist.featured/2
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
    field :add_album_to_library, non_null(:add_album_to_library_payload) do
      arg :input, non_null(:add_album_to_library_input)

      resolve &Album.add_to_library/2
    end

    @desc "Play an album"
    field :play_collection, :play_collection_payload do
      arg :input, non_null(:play_collection_input)

      resolve &Player.play_collection/2
    end

    @desc "Play a track or set of tracks"
    field :play_track, :play_track_payload do
      arg :input, non_null(:play_track_input)

      resolve &Player.play_track/2
    end

    @desc "Refresh the current session"
    field :refresh_session, :refresh_session_payload do
      arg :input, non_null(:refresh_session_input)

      resolve &Auth.refresh_session/2
    end

    @desc "Remove an album from a user's library"
    field :remove_album_from_library, non_null(:remove_album_from_library_payload) do
      arg :input, non_null(:remove_album_from_library_input)

      resolve &Album.remove_from_library/2
    end

    field :shuffle, :shuffle_payload do
      arg :input, non_null(:shuffle_input)

      resolve &Player.shuffle/2
    end
  end

  def middleware(middleware, _field, _object) do
    [NewRelic.Absinthe.Middleware] ++ middleware ++ [SpotifyWeb.Middleware.Error]
  end
end
