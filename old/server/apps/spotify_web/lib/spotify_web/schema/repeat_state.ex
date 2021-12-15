defmodule SpotifyWeb.Schema.RepeatState do
  use SpotifyWeb.Schema.Definition

  enum :repeat_state do
    value :context, as: "context"
    value :off, as: "off"
    value :track, as: "track"
  end
end
