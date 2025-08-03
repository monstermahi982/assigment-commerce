"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const HomePage = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/products");
  }, []);
  return (
    <div className="min-h-screen text-6xl flex justify-center items-center">
      Redirecting to products page
    </div>
  );
};

export default HomePage;
