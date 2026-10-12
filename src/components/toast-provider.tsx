"use client";

import { Toaster } from "react-hot-toast";

export function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 4_000,
        className: "font-semibold",
        style: {
          borderRadius: "0.75rem",
          color: "#0f172a",
          maxWidth: "24rem",
          padding: "0.875rem 1rem",
        },
        success: { iconTheme: { primary: "#047857", secondary: "#ffffff" } },
        error: { iconTheme: { primary: "#be123c", secondary: "#ffffff" } },
      }}
    />
  );
}
