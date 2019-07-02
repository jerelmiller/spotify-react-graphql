defmodule SpotifyWeb.Schema.Enums do
  use Absinthe.Schema.Notation

  enum :album_group do
    value :album, as: "album"
    value :appears_on, as: "appears_on"
    value :compilation, as: "compilation"
    value :single, as: "single"
  end

  enum :album_type do
    value :album, as: "album"
    value :compilation, as: "compilation"
    value :single, as: "single"
  end

  enum :device_type do
    value :avr, as: "AVR"
    value :audio_dongle, as: "AudioDongle"
    value :automobile, as: "Automobile"
    value :cast_audio, as: "CastAudio"
    value :cast_video, as: "CastVideo"
    value :computer, as: "Computer"
    value :game_console, as: "GameConsole"
    value :smartphone, as: "Smartphone"
    value :speaker, as: "Speaker"
    value :stb, as: "STB"
    value :tablet, as: "Tablet"
    value :tv, as: "TV"
    value :unknown, as: "unknown"
  end

  enum :release_date_precision do
    value :year, as: "year"
    value :month, as: "month"
    value :day, as: "day"
  end
end
