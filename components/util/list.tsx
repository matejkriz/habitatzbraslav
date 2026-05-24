import React from "react";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";
import { colorOptions } from "../fields/customColor";

type ListColor = (typeof colorOptions)[number];

const customColor: Record<ListColor, string> = {
  red: "[&>ul>li]:marker:text-[#F28E65]",
  green: "[&>ul>li]:marker:text-[#D2C72F]",
  teal: "[&>ul>li]:marker:text-[#BAC58F]",
  yellow: "[&>ul>li]:marker:text-[#EFC800]",
};

type ListProps = {
  color?: ListColor;
  children?: TinaMarkdownContent;
};

export const List = (props: ListProps) => {
  return (
    <div className={`${customColor[props?.color ?? "yellow"]}`}>
      {props?.children ? <TinaMarkdown content={props.children} /> : null}
    </div>
  );
};
