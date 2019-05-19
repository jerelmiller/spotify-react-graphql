defmodule SpotifyWeb.Schema.InputObjects do
  use Absinthe.Schema.Notation

  input_object :add_album_to_library_input do
    @desc "Album id of the album that should be added to the user's library"
    field :album_id, non_null(:id)
  end
end
