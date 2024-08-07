//'use client'
import { Suspense } from "react";

import React, { useEffect, useState } from "react";

const LazyComponent = React.lazy(() => new Promise(resolve => {
    setTimeout(() => {
      resolve(import('./AsyncComponent'));
    }, 2000); // 模拟网络延迟
  }));

const Header = () => {
  /*   useEffect(() => {
 }, []); */
  setTimeout(() => {}, 20000);
  return (
    <Suspense fallback={<p>Loading feed...</p>}>
       <LazyComponent />
    </Suspense>
  );
};
export default Header;
