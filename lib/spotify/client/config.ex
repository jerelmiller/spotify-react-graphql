defmodule Spotify.Client.Config do
  def client_id, do: config(:client_id)
  def client_secret, do: config(:client_secret)

  defp config(key), do: Application.get_env(:spotify_client, key)
end
