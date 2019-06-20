defprotocol SpotifyWeb.ResolverError do
  def message(error)
  def code(error)
end

defimpl SpotifyWeb.ResolverError, for: BitString do
  def message(error), do: error
  def code(_), do: nil
end

defimpl SpotifyWeb.ResolverError, for: Map do
  def message(%{message: message}), do: message
  def message(_), do: nil

  def code(%{code: code}), do: code
  def code(_), do: nil
end

defimpl SpotifyWeb.ResolverError, for: HTTPoison.Response do
  def message(%{body: %{error: %{message: message}}}), do: message
  def message(_), do: nil

  def code(%{status_code: status_code}), do: status_string(status_code)
  def code(_), do: status_string(500)

  defp status_string(400), do: "BAD_REQUEST"
  defp status_string(401), do: "UNAUTHENTICATED"
  defp status_string(403), do: "UNAUTHORIZED"
  defp status_string(404), do: "NOT_FOUND"
  defp status_string(500), do: "INTERNAL_SERVER_ERROR"
end
