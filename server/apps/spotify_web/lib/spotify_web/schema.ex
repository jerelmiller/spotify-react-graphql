defmodule SpotifyWeb.Schema do
  use Absinthe.Schema

  alias SpotifyWeb.Resolvers

  import_types(SpotifyWeb.Schema.Types)

  query do
    field :category, :category do
      arg :id, non_null(:id)

      resolve &Resolvers.Category.find/2
    end

    field :categories, :category_connection do
      arg :limit, :integer
      arg :offset, :integer

      resolve &Resolvers.Category.categories/2
    end

    field :playlists_by_category, :playlist_connection do
      arg :category_id, non_null(:id)
      arg :limit, :integer, default_value: 50
      arg :offset, :integer, default_value: 0

      resolve &Resolvers.Playlist.by_category/2
    end

    @desc "Info about the current logged-in user"
    field :viewer, :viewer, resolve: &Resolvers.Viewer.viewer/2
  end

  def middleware(middleware, _field, _object) do
    [NewRelic.Absinthe.Middleware] ++ middleware
  end
end
