defmodule SpotifyWeb.Schema.Player do
  use SpotifyWeb.Schema.Definition

  object :player do
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
  end

  defp progress(%{progress_ms: progress}, _, _), do: {:ok, progress}
end
