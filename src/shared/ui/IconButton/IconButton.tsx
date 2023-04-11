import React, { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";

import { Icon, IconProps } from "shared/ui/Icon/Icon";

type IconButtonProps = IconProps &
  DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & {
    svgClassName?: string;
  };

export const IconButton: FC<IconButtonProps> = (props) => {
  const { svgClassName, Svg, ...otherProps } = props;
  return (
    <button {...otherProps}>
      <Icon Svg={Svg} className={svgClassName} />
    </button>
  );
};
