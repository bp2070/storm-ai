import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useChat } from "../src/hooks/useChat";

describe("useChat", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should initialize with a welcome message", () => {
    const provider = { name: "mock", async chat() { return "response"; } };
    const { result } = renderHook(() => useChat(provider as any));

    expect(result.current.messages).toHaveLength(1);
    expect(result.current.messages[0].role).toBe("assistant");
    expect(result.current.isProcessing).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("should ignore empty messages", async () => {
    let callCount = 0;
    const provider = { 
      name: "mock", 
      async chat() { 
        callCount++;
        return "response"; 
      } 
    };
    const { result } = renderHook(() => useChat(provider as any));

    await act(async () => {
      vi.advanceTimersByTimeAsync(0);
      await result.current.sendMessage("   ");
    });

    expect(callCount).toBe(0);
    expect(result.current.messages).toHaveLength(1);
  });

  it("should clear error when clearError is called", () => {
    const provider = { name: "mock", async chat() { throw new Error("Test error"); } };
    const { result } = renderHook(() => useChat(provider as any));

    act(() => {
      result.current.clearError();
    });

    expect(result.current.error).toBeNull();
    expect(result.current.retryCount).toBe(0);
  });

  it("should reset retryCount when clearError is called", () => {
    const { result } = renderHook(() => useChat({ name: "mock", async chat() { return "x"; } } as any));

    act(() => {
      result.current.clearError();
    });

    expect(result.current.retryCount).toBe(0);
  });
});