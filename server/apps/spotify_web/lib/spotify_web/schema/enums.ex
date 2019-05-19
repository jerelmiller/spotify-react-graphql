defmodule SpotifyWeb.Schema.Enums do
  use Absinthe.Schema.Notation

  enum :album_group do
    value :album
    value :appears_on
    value :compilation
    value :single
  end

  enum :album_type do
    value :album
    value :compilation
    value :single
  end

  enum :release_date_precision do
    value :year
    value :month
    value :day
  end
end
