defmodule SpotifyWeb.Schema.Context do
  use SpotifyWeb.Schema.Definition

  object :context do
    @desc "The external_urls of the context, or empty if not available."
    field :external_urls, list_of(:external_url),
      resolve: &Schema.ExternalUrl.list/3

    @desc "The uri of the context."
    field :uri, non_null(:string)

    @desc "The href of the context, or null if not available."
    field :href, :string

    @desc "The object type of the item's context."
    field :type, non_null(:context_type)
  end
end
