defmodule Spotify.Repo.Migrations.CreateSessions do
  use Ecto.Migration

  def change do
    create table(:sessions) do
      add :access_token, :text, null: false
      add :refresh_token, :text, null: false
      add :expires_at, :utc_datetime, null: false
      add :scope, :text, null: false, default: ""

      timestamps()
    end

    create unique_index(:sessions, [:access_token])
  end
end
