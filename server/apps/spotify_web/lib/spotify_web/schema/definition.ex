defmodule SpotifyWeb.Schema.Definition do
  defmacro __using__(_) do
    quote do
      use Absinthe.Schema.Notation
      alias SpotifyWeb.Schema
      import SpotifyWeb.Resolvers.Helpers
    end
  end
end
