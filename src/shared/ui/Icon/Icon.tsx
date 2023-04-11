import React, { FC, SVGProps } from "react";

export interface IconProps {
  Svg: FC<SVGProps<SVGSVGElement>>;
  className?: string;
}

export const Icon: FC<IconProps> = ({ Svg, className }) => {
  return <Svg className={className} />;
};
