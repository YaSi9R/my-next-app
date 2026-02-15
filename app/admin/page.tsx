"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminHome() {
  const router = useRouter();

  useEffect(() => {
    fetch("/api/admin/verify")
      .then((res) => {
        if (!res.ok) router.push("/admin/login");
      });
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#022c75]">
        Welcome to Tekmart Admin
      </h1>
    </div>
  );
}