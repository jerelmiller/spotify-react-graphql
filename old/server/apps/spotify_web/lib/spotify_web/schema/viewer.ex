defmodule SpotifyWeb.Schema.Viewer do
  use SpotifyWeb.Schema.Definition

  object :viewer_queries do
    @desc "Info about the current logged-in user"
    field :viewer, :viewer, resolve: fn _, _ -> {:ok, %{}} end
  end

  object :viewer do
    @desc "The list of the current user's available devices."
    field :devices, list_of(:device), resolve: &devices/2

    @desc "The list of the current user's followed artists."
    field :followed_artists, :artist_connection do
      arg :limit, :integer, default_value: 50
      arg :after, :string

      resolve &followed_artists/2
    end

    @desc "Information about the user's current playback."
    field :player, :player do
      @desc """
      An [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)
      or the string from_token. Provide this parameter if you want to apply
      [Track Relinking](https://developer.spotify.com/documentation/general/guides/track-relinking-guide/).
      """
      arg :market, :string

      resolve &player/2
    end

    @desc "The list of the current user's owned or followed playlists"
    field :playlists, :playlist_connection do
      arg :limit, :integer, default_value: 50
      arg :offset, :integer, default_value: 0

      resolve &playlists/2
    end

    @desc "Info about the user"
    field :user, :user, resolve: &user/2

    @desc "The collection of saved albums in the current user's Spotify library."
    field :saved_albums, :saved_album_connection do
      arg :limit, :integer, default_value: 50
      arg :offset, :integer, default_value: 0

      resolve &saved_albums/2
    end

    @desc "The collection of saved songs in the current user's Spotify library."
    field :saved_tracks, :saved_track_connection do
      arg :limit, :integer, default_value: 50
      arg :offset, :integer, default_value: 0

      resolve &saved_tracks/2
    end
  end

  defp devices(_, res) do
    res
    |> prepare_headers()
    |> SpotifyClient.devices()
    |> handle_response(fn %{devices: devices} -> devices end)
  end

  defp followed_artists(args, res) do
    args
    |> SpotifyClient.followed_artists(prepare_headers(res))
    |> handle_response(fn %{artists: artists} -> artists end)
  end

  defp player(args, res) do
    args
    |> SpotifyClient.player(prepare_headers(res))
    |> case do
      {:ok, %{body: ""}} -> {:ok, nil}
      {:ok, %{body: body}} -> {:ok, body}
      {:error, response} -> {:error, response}
    end
  end

  defp saved_albums(args, %{context: %{authorization: authorization}}) do
    args
    |> SpotifyClient.saved_albums([{"Authorization", authorization}])
    |> case do
      {:ok, %HTTPoison.Response{body: body}} -> {:ok, body}
      error -> error
    end
  end

  defp saved_tracks(args, res) do
    args
    |> SpotifyClient.saved_tracks(prepare_headers(res))
    |> handle_response()
  end

  defp playlists(args, %{context: %{authorization: authorization}}) do
    args
    |> SpotifyClient.playlists([{"Authorization", authorization}])
    |> handle_response()
  end

  defp user(_, res) do
    res
    |> prepare_headers()
    |> SpotifyClient.current_user()
    |> handle_response()
  end
end
