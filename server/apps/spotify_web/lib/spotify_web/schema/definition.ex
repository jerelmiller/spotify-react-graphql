defmodule SpotifyWeb.Schema.Definition do
  defmacro __using__(_) do
    quote do
      use Absinthe.Schema.Notation

      alias SpotifyWeb.Resolvers.Helpers, as: Helper
    end
  end
end
