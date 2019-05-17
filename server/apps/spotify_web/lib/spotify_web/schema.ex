defmodule SpotifyWeb.Schema do
  use Absinthe.Schema

  alias SpotifyWeb.Resolvers

  import_types(SpotifyWeb.Schema.Types)

  query do
    @desc "Info about the current logged-in user"
    field :viewer, :viewer, resolve: &Resolvers.Viewer.viewer/2

    field :categories, :category_connection do
      arg :limit, :integer
      arg :offset, :integer

      resolve &Resolvers.Category.categories/3
    end
  end

  def middleware(middleware, _field, _object) do
    [NewRelic.Absinthe.Middleware] ++ middleware
  end
end
