defmodule SpotifyClientTest do
  use ExUnit.Case
  doctest SpotifyClient

  test "greets the world" do
    assert SpotifyClient.hello() == :world
  end
end
