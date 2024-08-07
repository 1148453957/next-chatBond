//'use client'
import { Suspense } from "react";

import React, { useEffect, useState } from "react";



const Header = () => {
  /*   useEffect(() => {
 }, []); */
  setTimeout(() => {}, 20000);
  return (
    <Suspense fallback={<p>Loading feed...</p>}>
      <>123</>
    </Suspense>
  );
};
export default Header;
