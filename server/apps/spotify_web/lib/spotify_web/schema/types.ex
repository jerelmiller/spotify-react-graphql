defmodule SpotifyWeb.Schema.Types do
  use Absinthe.Schema.Notation

  object :user do
    field :id, non_null(:id)  
    field :display_name, :string
  end

  object :viewer do
    field :user, :user 
  end

end
