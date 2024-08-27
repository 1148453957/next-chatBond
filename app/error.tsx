"use client";
import { Button } from "antd";

import { redirect } from "next/navigation";
export default function Error() {
  return (
    <div className="w-full h-full fcc flex-col mt--16">
      <span>Something went wrong!</span>
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
