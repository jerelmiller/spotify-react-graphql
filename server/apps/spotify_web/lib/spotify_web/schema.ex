defmodule SpotifyWeb.Schema do
  use Absinthe.Schema

  import_types(SpotifyWeb.Schema.Types)

  query do
    @desc "Info about the current logged-in user"
    field :viewer, :viewer
  end

  def middleware(middleware, _field, _object) do
    [NewRelic.Absinthe.Middleware] ++ middleware
  end
end
