defmodule SpotifyWeb.Schema.Enums do
  use Absinthe.Schema.Notation

  enum :album_group do
    value :album, as: "album"
    value :appears_on, as: "appears_on"
    value :compilation, as: "compilation"
    value :single, as: "single"
  end

  enum :album_type do
    value :album, as: "album"
    value :compilation, as: "compilation"
    value :single, as: "single"
  end

  enum :release_date_precision do
    value :year, as: "year"
    value :month, as: "month"
    value :day, as: "day"
  end
end
