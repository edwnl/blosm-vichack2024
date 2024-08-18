import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    shapeRendering="crispEdges"
    viewBox="0 -0.5 16 16"
    {...props}
  >
    <Path stroke="#ed302c" d="M8 5h1M6 6h1m2 0h1M5 7h1m3 0h1M5 8h4" />
    <Path stroke="#9b221a" d="M9 5h1M8 6h1m1 1h1M9 8h1" />
    <Path stroke="#bf2529" d="M7 6h1m2 0h1M6 7h1m1 0h1M6 9h1" />
    <Path stroke="#742303" d="M7 7h1" />
    <Path stroke="#204626" d="M7 9h1m-3 4h1m0 1h1m1 0h2m-3 1h1m1 0h1" />
    <Path stroke="#265a25" d="M8 9h1m-3 4h1m3 0h2m-4 2h1" />
    <Path stroke="#4a8f28" d="M8 10h1m-1 1h1m-1 1h1" />
    <Path stroke="#2b702a" d="M8 13h1" />
  </Svg>
);
export default SvgComponent;
