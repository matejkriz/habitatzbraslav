import React from "react";
import Link from "next/link";
import { colorOptions } from "../fields/customColor";

const customColor: Record<(typeof colorOptions)[number], string> = {
  red: "bg-[#F28E65] hover:bg-[#f16832]",
  green: "bg-[#D2C72F] hover:bg-[#908710]",
  teal: "bg-[#BAC58F] hover:bg-[#7f9137]",
  yellow: "bg-[#EFC800] hover:bg-[#957d05]",
};

export const Button = (props) => {
  return props?.link && props?.label && (
    <Link
      href={props?.link}
      target="_blank"
    >
      <button className={`${customColor[props?.color ?? "yellow"]} text-white font-bold py-2 px-4 rounded text-xl`}>
      {props?.label}
      </button>
    </Link>
  );
};
