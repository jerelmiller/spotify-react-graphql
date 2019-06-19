defmodule Spotify.Repo.Migrations.CreateSessions do
  use Ecto.Migration

  def change do
    create table(:sessions) do
      add :access_token, :string, null: false
      add :refresh_token, :string, null: false
      add :expires_at, :utc_datetime, null: false
      add :scopes, :text, null: false, default: ""

      timestamps()
    end

    create unique_index(:sessions, [:access_token])
  end
end
