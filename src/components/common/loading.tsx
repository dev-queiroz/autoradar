"use client";

import React from "react";

export function Loading({ size = 24 }: { size?: number }) {
  return (
    <div role="status" className="flex items-center justify-center">
      <svg
        className="animate-spin text-primary"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeOpacity="0.2" />
        <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      </svg>
    </div>
  );
}
