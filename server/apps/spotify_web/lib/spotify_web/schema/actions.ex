defmodule SpotifyWeb.Schema.Actions do
  use SpotifyWeb.Schema.Definition

  object :actions do
    field :interrupting_playback, non_null(:action), resolve: &action/3
    field :pausing, non_null(:action), resolve: &action/3
    field :resuming, non_null(:action), resolve: &action/3
    field :seeking, non_null(:action), resolve: &action/3
    field :skipping_next, non_null(:action), resolve: &action/3
    field :skipping_prev, non_null(:action), resolve: &action/3
    field :toggling_repeat_context, non_null(:action), resolve: &action/3
    field :toggling_shuffle, non_null(:action), resolve: &action/3
    field :toggling_repeat_track, non_null(:action), resolve: &action/3
    field :transferring_playback, non_null(:action), resolve: &action/3
  end

  object :action do
    field :allowed, non_null(:boolean), resolve: &allowed/3
    field :disallowed, non_null(:boolean), resolve: &disallowed/3
  end

  defp action(actions, _, %{definition: definition}) do
    {:ok, Map.get(actions, definition.schema_node.identifier, false)}
  end

  defp allowed(value, _, _), do: {:ok, !value}

  defp disallowed(true, _, _), do: {:ok, true}
  defp disallowed(_, _, _), do: {:ok, false}
end
