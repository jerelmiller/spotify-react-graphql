defmodule Spotify.Sessions do
  alias Spotify.Repo
  alias Spotify.Sessions.Session

  def create(session \\ %Session{}, attrs)

  def create(session, %{expires_in: expires_in} = attrs) when is_integer(expires_in) do
    create(
      session,
      attrs
      |> Map.put(:expires_at, DateTime.add(DateTime.utc_now(), expires_in, :seconds))
      |> Map.delete(:expires_in)
    )
  end

  def create(session, attrs) do
    session
    |> Session.changeset(attrs)
    |> Repo.insert()
  end
end
