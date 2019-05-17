# This file is responsible for configuring your umbrella
# and **all applications** and their dependencies with the
# help of Mix.Config.
#
# Note that all applications in your umbrella share the
# same configuration and dependencies, which is why they
# all use the same configuration file. If you want different
# configurations or dependencies per app, it is best to
# move said applications out of the umbrella.
use Mix.Config

# Configure Mix tasks and generators
config :spotify,
  ecto_repos: [Spotify.Repo]

config :spotify_web,
  ecto_repos: [Spotify.Repo],
  generators: [context_app: :spotify]

# Configures the endpoint
config :spotify_web, SpotifyWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "ngS46bHsTRlXaWEDz5lsWzFl4ie21lY1kluV/ZBMoyyCOhJTIpfC1Ch7rzqYPbZu",
  render_errors: [view: SpotifyWeb.ErrorView, accepts: ~w(json)],
  pubsub: [name: SpotifyWeb.PubSub, adapter: Phoenix.PubSub.PG2],
  instrumenters: [NewRelic.Phoenix.Instrumenter]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
