import { renderHook, waitFor } from "@testing-library/react";

import { server, rest } from "../../test/server";
import useFetch from "./use-fetch";

describe("useFetch", () => {
  it("should resolve", async () => {
    const { result } = renderHook(() => useFetch("/api/search?q="));

    expect(result.current.data).toBe(undefined);
    expect(result.current.error).toBe(undefined);
    expect(result.current.loading).toBe(true);

    const initial = result.current;
    await waitFor(() => expect(result.current).not.toBe(initial));

    expect(result.current.data).toStrictEqual({ docs: [], total: 0 });
    expect(result.current.error).toBe(undefined);
    expect(result.current.loading).toBe(false);
  });

  it("should return error", async () => {
    const { result } = renderHook(() =>
      useFetch("/api/search?q=test", { method: "POST" })
    );

    const initial = result.current;
    await waitFor(() => expect(result.current).not.toBe(initial));

    expect(result.current.data).toBe(undefined);
    expect(result.current.error).toBeTruthy();
    expect(result.current.loading).toBe(false);
  });

  it("should not invoke request when deferred", async () => {
    const { result } = renderHook(() =>
      useFetch("/api/search?q=test", undefined, true)
    );

    expect(result.current.data).toBe(undefined);
    expect(result.current.error).toBe(undefined);
    expect(result.current.loading).toBe(false);
  });

  it("should abort active request when unmounting", async () => {
    server.use(
      rest.all("/api/search", async (req, res, ctx) => {
        return res(ctx.delay(), ctx.json({ docs: [], total: 0 }));
      })
    );

    const { result, unmount } = renderHook(() =>
      useFetch("/api/search?q=test")
    );

    unmount();

    expect(result.current.data).toBe(undefined);
    expect(result.current.error).toBe(undefined);
    expect(result.current.signal.aborted).toBe(true);
  });
});
