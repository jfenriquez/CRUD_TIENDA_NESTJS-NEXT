"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaRegEdit } from "react-icons/fa";
import { IoIosArrowBack, IoIosList } from "react-icons/io";
import Link from "next/link";
import { ChartDoughnut } from "@/components/Chars";
import styled from "styled-components";
import Cookie from "js-cookie";
import axios from "axios";
import endPoints from "@/services/api";
import { useRouter } from "next/navigation";
import { middleware } from "@/middleware";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    const token = Cookie.get("token");
    if (!token) {
      router.push("/login");
    }
  }, []);
  //console.log(isOpen);
  return (
    <>
      <div className="flex  items-center justify-center">
        <ChartDoughnut />
      </div>
    </>
  );
};

export default Page;
