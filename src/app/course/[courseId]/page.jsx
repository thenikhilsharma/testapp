"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Subject = () => {

  const [subject, setSubject] = useState();
  const pathname = usePathname();
  const pathId = pathname.split("/").pop()
  
  useEffect(() => {
    async function getCourseById(id) {
      const data = await fetch(`https://dummyjson.com/users/${id}`);
      setSubject(await data.json());
    }
    getCourseById(pathId);

  }, [pathId]);

  return (
    <div>
      <h1 className="text-white size-4">{subject?.firstName}</h1>
    </div>
  );
};

export default Subject;
