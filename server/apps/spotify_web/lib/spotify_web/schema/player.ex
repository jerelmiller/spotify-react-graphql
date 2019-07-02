defmodule SpotifyWeb.Schema.Player do
  use SpotifyWeb.Schema.Definition

  enum :media_type do
    value :ad, as: "ad"
    value :episode, as: "episode"
    value :track, as: "track"
    value :unknown, as: "unknown"
  end

  object :player do
    @desc "The object type of the currently playing item."
    field :currently_playing_type, non_null(:media_type)

    @desc "The device that is currently active."
    field :device, non_null(:device)

    @desc "Unix millisecond timestamp when data was fetched."
    field :timestamp, non_null(:integer)

    @desc """
    Progress into the currently playing track in milliseconds. Can be null
    (e.g. If private session is enabled this will be null).
    """
    field :progress, :integer, resolve: &progress/3

    @desc """
    A Context Object. Can be null (e.g. If private session is enabled this will
    be null).
    """
    field :context, :context

    @desc "off, track, context"
    field :repeat_state, non_null(:repeat_state)

    @desc "If shuffle is on or off."
    field :shuffle_state, non_null(:boolean)

    @desc "If something is currently playing."
    field :is_playing, non_null(:boolean)

    @desc """
    The currently playing track. Can be null (e.g. If private session is
    enabled this will be null).
    """
    field :item, :full_track
  end

  defp progress(%{progress_ms: progress}, _, _), do: {:ok, progress}
end
