import { interpolate } from "d3-interpolate";

export const d3Interpolation = (
  begValue: any,
  endValue: any,
  attr: string | undefined
) => {
  // This condition is only needed if we're assigning `transform` attribute on the SVG element, which we're not (we're setting CSS attribute instead)
  // if (attr === "transform") {
  //   return interpolateTransformSvg(begValue, endValue);
  // }

  return interpolate(begValue, endValue);
};
