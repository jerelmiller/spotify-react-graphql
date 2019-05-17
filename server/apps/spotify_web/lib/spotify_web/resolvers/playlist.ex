defmodule SpotifyWeb.Resolvers.Playlist do
  def id(%{"id" => id}, _, _), do: {:ok, id}

  def collaborative(%{"collaborative" => collaborative}, _, _), do: {:ok, collaborative}

  def images(_, _, _), do: []

  def name(%{"name" => name}, _, _), do: {:ok, name}

  def owner(%{"owner" => owner}, _, _), do: {:ok, owner}

  def public(%{"public" => public}, _, _), do: {:ok, public}
end
