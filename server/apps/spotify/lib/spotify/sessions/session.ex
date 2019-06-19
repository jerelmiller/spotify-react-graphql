defmodule Spotify.Sessions.Session do
  use Spotify.Schema

  schema "sessions" do
    field :access_token, :string
    field :refresh_token, :string
    field :expires_at, :utc_datetime
    field :scope, :string

    timestamps()
  end

  def changeset(%__MODULE__{} = session, attrs) do
    session
    |> cast(attrs, [:access_token, :refresh_token, :expires_at, :scope])
    |> validate_required([:access_token, :refresh_token, :expires_at, :scope])
  end
end
