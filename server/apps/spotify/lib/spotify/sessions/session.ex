defmodule Spotify.Sessions.Session do
  use Spotify.Schema

  schema "sessions" do
    field :access_token, :string
    field :refresh_token, :string
    field :expires_at, :utc_datetime
    field :scope, :string
    field :expires_in, :integer, virtual: true

    timestamps()
  end

  def create_changeset(%__MODULE__{} = session, attrs) do
    session
    |> cast(attrs, [:access_token, :refresh_token, :expires_in, :scope])
    |> validate_required([:access_token, :refresh_token, :expires_in, :scope])
    |> put_expires_at()
  end

  def update_changeset(%__MODULE__{} = session, attrs) do
    session
    |> cast(attrs, [:access_token, :expires_in, :scope])
    |> validate_required([:access_token, :expires_in, :scope])
    |> put_expires_at()
  end

  defp put_expires_at(changeset) do
    put_change(
      changeset,
      :expires_at,
      DateTime.utc_now()
      |> DateTime.add(get_change(changeset, :expires_in), :second)
      |> DateTime.truncate(:second)
    )
  end
end
