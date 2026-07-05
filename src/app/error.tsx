"use client";

import React from "react";

export default function GlobalError({ error, reset }: { error: any; reset?: () => void }) {
  return (
    <div style={{ padding: 24, fontFamily: "Inter, system-ui, -apple-system, sans-serif" }}>
      <h1 style={{ margin: 0, fontSize: 20 }}>Something went wrong</h1>
      <p style={{ color: "#555" }}>{String(error?.message ?? error)}</p>
      <div style={{ marginTop: 12 }}>
        <button
          onClick={() => reset && reset()}
          style={{ padding: "8px 12px", borderRadius: 6, cursor: "pointer" }}
        >
          Try again
        </button>
      </div>
    </div>
  );
}
