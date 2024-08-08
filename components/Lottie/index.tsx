"use client";
import React, { useEffect, useRef } from "react";
import animationData from "./btn.json";
import lottie from "lottie-web";

const Lottie = () => {
  const elementRef = useRef(null);
  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: elementRef.current!,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: animationData,
    });

    return () => {
      animation.destroy(); // 清理动画
    };
  }, [elementRef]);
  return (
    <div
      className="w-full"
      ref={elementRef}
    ></div>
  );
};
export default Lottie;
