"use client";
import { Button } from "antd";

import { redirect } from "next/navigation";
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="w-full h-full fcc flex-col mt--16">
      <div className="w-full fcc">
        <span className="text-6">404</span>
        <div className="w-0.25 h-8 bg-[#ccc] mx-5"></div>
        <span>This page could not be found.</span>
      </div>
      <Button
        onClick={() => redirect("/")}
        type="primary"
        className="!w-50 !h-14 mt-8 linearBg !fw-700 !text-4"
      >
        Home
      </Button>
    </div>
  );
}
