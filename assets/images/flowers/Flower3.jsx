import * as React from "react";
import Svg, { Path } from "react-native-svg";
const Flower3 = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    shapeRendering="crispEdges"
    viewBox="0 -0.5 16 16"
    {...props}
  >
    <Path
      stroke="#ffec4f"
      d="M7 7h2M6 8h1m2 0h1M5 9h1m1 0h1m2 0h1m-5 1h1m2 0h1"
    />
    <Path stroke="#fed639" d="M7 8h1m1 1h1m-2 1h1" />
    <Path stroke="#f19d25" d="M8 8h1M6 9h1" />
    <Path stroke="#bd6a22" d="M8 9h1m-2 1h1" />
    <Path stroke="#177c04" d="M7 11h2m-4 1h1m0 1h1m3 0h1m-3 1h2m-2 1h1" />
    <Path stroke="#4a8f28" d="M6 12h1m1 0h1m-1 1h2m-3 2h1" />
    <Path stroke="#55ab2d" d="M7 12h1m-1 1h1m-1 1h1" />
  </Svg>
);
export default Flower3;
