defmodule SpotifyWeb.Resolvers.Auth do
  alias Spotify.Sessions

  def refresh_session(%{input: input}, _) do
    with %Sessions.Session{} = session <-
           Sessions.find_by_access_token(input.token),
         {:ok, %{body: %{access_token: access_token} = body}} <-
           SpotifyClient.refresh_session(
             session.access_token,
             session.refresh_token
           ),
         {:ok, session} <-
           Sessions.update(
             session,
             Map.take(body, [:access_token, :scope, :expires_in])
           ) do
      {:ok, %{token: access_token}}
    else
      nil ->
        {:error,
         %{message: "Unable to find current session", code: "UNAUTHENTICATED"}}
    end
  end
end
