import * as React from "react";
import classNames from "classnames";
import { Hex, HexUtils } from "react-hexgrid";
import Point from "react-hexgrid/lib/models/Point";
import { useLayoutContext } from "react-hexgrid/lib/Layout";

type H = { data?: any; state: { hex: Hex }; props: HexagonProps };

export type HexagonDragEventHandler<T = Element, AdditionalData = any> = (
  event: React.DragEvent<T>,
  h: H,
  additionalData?: AdditionalData
) => void;

export type HexagonDragDropEventHandler<T = Element, AdditionalData = any> = (
  event: React.DragEvent<T>,
  h: H,
  additionalData: AdditionalData
) => void;

export type HexagonMouseEventHandler<T = SVGGElement> = (
  event: React.MouseEvent<T, globalThis.MouseEvent>,
  h: H
) => void;

export type HexagonProps = {
  q: number;
  r: number;
  s: number;
  fill?: string;
  className?: string;
  cellStyle?: React.CSSProperties | undefined;
  data?: any;
  onMouseEnter?: HexagonMouseEventHandler;
  onMouseLeave?: HexagonMouseEventHandler;
  onClick?: HexagonMouseEventHandler;
  onMouseOver?: HexagonMouseEventHandler;
  children?: React.ReactNode | React.ReactNode[];
};

type TargetProps = {
  hex: Hex;
  pixel: Point;
  data?: any;
  fill?: string;
  className?: string;
};

/**
 * Renders a Hexagon cell at the given rqs-based coordinates.
 */
export function CustomHexagon(
  props: HexagonProps &
    Omit<
      React.SVGProps<SVGGElement>,
      "transform" | "onMouseEnter" | "onClick" | "onMouseOver" | "onMouseLeave"
    >
) {
  // destructure props into their values
  const {
    q,
    r,
    s,
    fill,
    cellStyle,
    className,
    children,
    onMouseEnter,
    onMouseLeave,
    onMouseOver,
    onClick,
    data,
    fillOpacity,
    ...rest
  } = props;

  const { layout, points } = useLayoutContext();

  const { hex, pixel } = React.useMemo(() => {
    const hex = new Hex(q, r, s);
    const pixel = HexUtils.hexToPixel(hex, layout);
    return {
      hex,
      pixel,
    };
  }, [q, r, s, layout]);

  // for backwards comapatbility
  const state = { hex };

  const fillId = fill ? `url(#${fill})` : undefined;

  return (
    <g
      className={classNames("hexagon-group", className)}
      transform={`translate(${pixel.x}, ${pixel.y})`}
      {...rest}
      onMouseEnter={(e) => {
        if (onMouseEnter) {
          onMouseEnter(e, { data, state, props });
        }
      }}
      onClick={(e) => {
        if (onClick) {
          onClick(e, { data, state, props });
        }
      }}
      onMouseOver={(e) => {
        if (onMouseOver) {
          onMouseOver(e, { data, state, props });
        }
      }}
      onMouseLeave={(e) => {
        if (onMouseLeave) {
          onMouseLeave(e, { data, state, props });
        }
      }}
    >
      <g className="hexagon" style={cellStyle}>
        <polygon points={points} fill={fillId} />
        {children}
      </g>
    </g>
  );
}

export default CustomHexagon;
