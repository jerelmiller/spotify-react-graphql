defmodule SpotifyWeb.OAuthController do
  use SpotifyWeb, :controller
  alias SpotifyWeb.OAuthConfig

  @scopes [
    "streaming",
    "user-follow-modify",
    "user-follow-read",
    "playlist-read-private",
    "playlist-modify-private",
    "playlist-read-collaborative",
    "playlist-modify-public",
    "user-modify-playback-state",
    "user-read-private",
    "user-read-birthdate",
    "user-read-playback-state",
    "user-read-currently-playing",
    "user-read-email",
    "user-library-read",
    "user-library-modify",
    "user-top-read",
    "user-read-recently-played"
  ]

  def init(conn, _) do
    conn
    |> redirect(external: "#{SpotifyClient.oauth_uri()}/authorize?#{generate_oauth_params()}")
  end

  def finalize(conn, %{"code" => code}) do
    with {:ok, %HTTPoison.Response{body: %{access_token: access_token} = body}} <-
           SpotifyClient.generate_token(code, OAuthConfig.redirect_uri()),
         {:ok, _} <- Spotify.Sessions.create(body) do
      conn
      |> redirect(external: "#{OAuthConfig.client_uri()}/set-token?token=#{access_token}")
    else
      _ ->
        conn
        |> send_resp(500, "Something went wrong trying to authorize you.")
    end
  end

  defp generate_oauth_params do
    URI.encode_query(%{
      response_type: "code",
      client_id: SpotifyClient.client_id(),
      redirect_uri: OAuthConfig.redirect_uri(),
      scope: Enum.join(@scopes, " ")
    })
  end
end
