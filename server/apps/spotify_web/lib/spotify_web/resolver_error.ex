defprotocol SpotifyWeb.ResolverError do
  def message(error)
  def code(error)
end

defimpl SpotifyWeb.ResolverError, for: BitString do
  def message(error), do: {:ok, error}
  def code(_), do: :ok
end

defimpl SpotifyWeb.ResolverError, for: Map do
  def message(%{message: message}), do: {:ok, message}
  def message(_), do: :error

  def code(%{code: code}), do: {:ok, code}
  def code(_), do: :ok
end

defimpl SpotifyWeb.ResolverError, for: HTTPoison.Response do
  def message(%{body: %{error: %{message: message}}}), do: {:ok, message}
  def message(_), do: :error

  def code(%{status_code: status_code}), do: {:ok, status_string(status_code)}
  def code(_), do: :ok

  defp status_string(401), do: "UNAUTHENTICATED"
end
