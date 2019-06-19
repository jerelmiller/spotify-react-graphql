defmodule SpotifyWeb.Resolvers.Helpers do
  def prepare_headers(%{context: %{authorization: authorization}}),
    do: [{"Authorization", authorization}]

  def handle_response(response, path \\ fn body -> body end)

  def handle_response({:ok, %HTTPoison.Response{body: body}}, result_path) do
    {:ok, result_path.(body)}
  end

  def handle_response({:error, %HTTPoison.Response{body: %{error: %{message: error_message}}}}, _) do
    {:error, error_message}
  end

  def handle_response(error, _), do: error
end
