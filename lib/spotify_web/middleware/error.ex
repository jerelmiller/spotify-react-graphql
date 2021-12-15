defmodule SpotifyWeb.Middleware.Error do
  @behaviour Absinthe.Middleware

  alias SpotifyWeb.ResolverError

  def call(%{errors: errors} = resolution, _) do
    %{resolution | errors: Enum.map(errors, &format_error/1)}
  end

  def call(resolution, _), do: resolution

  defp format_error(error) do
    %{}
    |> put_message(error)
    |> put_extensions(error)
  end

  defp put_message(map, error) do
    error
    |> ResolverError.message()
    |> case do
      nil -> map
      message -> Map.put(map, :message, message)
    end
  end

  defp put_extensions(map, error) do
    map
    |> Map.put_new(:extensions, %{})
    |> Map.update!(:extensions, fn extensions ->
      extensions
      |> put_code(error)
      |> put_stacktrace(map.message)
    end)
  end

  defp put_code(extensions, error) do
    error
    |> ResolverError.code()
    |> case do
      nil -> Map.put(extensions, :code, "INTERNAL_SERVER_ERROR")
      code -> Map.put(extensions, :code, code)
    end
  end

  defp put_stacktrace(extensions, message) do
    case debug?() do
      true ->
        Map.put(
          extensions,
          :stacktrace,
          ["Error: #{message}" | formatted_stacktrace()]
        )

      false ->
        extensions
    end
  end

  defp formatted_stacktrace do
    with {:current_stacktrace, stacktrace} <-
           Process.info(self(), :current_stacktrace) do
      stacktrace
      |> tl()
      |> Enum.map(fn {module, function, arity, [file: file, line: line]} ->
        "at #{module}.#{function}/#{arity} (#{file}:#{line})"
      end)
    end
  end

  def debug? do
    :spotify
    |> Application.get_env(SpotifyWeb.Middleware)
    |> Keyword.get(:debug, false)
  end
end
