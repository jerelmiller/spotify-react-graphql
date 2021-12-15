defmodule Spotify.Sessions do
  alias Spotify.Repo
  alias Spotify.Sessions.Session

  def create(session \\ %Session{}, attrs)

  def create(session, attrs) do
    session
    |> Session.create_changeset(attrs)
    |> Repo.insert()
  end

  def find_by_access_token(access_token),
    do: Repo.get_by(Session, access_token: access_token)

  def update(%Session{} = session, attrs) do
    session
    |> Session.update_changeset(attrs)
    |> Repo.update()
  end
end
