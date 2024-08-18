import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    shapeRendering="crispEdges"
    viewBox="0 -0.5 16 16"
    {...props}
  >
    <Path
      stroke="#d380d3"
      d="M2 2h1m9 0h1M3 3h1m7 0h1m-2 1h1m2 4h1M1 9h1m1 0h1m-2 1h1m4 1h1m4 0h2m-3 1h1m-8 2h1m-2 1h1"
    />
    <Path
      stroke="#de93f1"
      d="M3 2h1m6 1h1M3 4h1m8 4h1M2 9h1m8 0h1m-5 3h1m4 0h1m-9 3h1"
    />
    <Path
      stroke="#b66bb2"
      d="M11 2h1M2 3h1m1 0h1m7 0h1M4 4h1m4 0h1m1 0h1M5 5h1m4 0h1m0 3h1m0 1h1M3 10h1m4 2h1m4 0h1m-7 1h1"
    />
    <Path
      stroke="#9e619f"
      d="M5 4h1M4 5h1m4 0h1M8 6h1m1 2h1m-7 2h1m5 0h1m-8 1h1m1 0h1m-2 1h1m3 1h1m1 0h1m1 0h1m-5 1h1m2 0h1"
    />
    <Path stroke="#529a2e" d="M5 6h1m0 2h1m0 2h1m1 5h1" />
    <Path stroke="#55ab2d" d="M6 6h1m0 2h1M7 9h1m-2 3h1m1 3h1" />
    <Path stroke="#4a8f28" d="M9 6h1M6 7h1m1 0h1m0 2h1m-2 2h1m-4 1h1" />
    <Path stroke="#177c04" d="M7 7h1m2 2h1m-3 1h1m-5 1h1m6 2h1m-2 1h1" />
  </Svg>
);
export default SvgComponent;
