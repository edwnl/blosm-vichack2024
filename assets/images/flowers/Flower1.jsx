import * as React from "react";
import Svg, { Path } from "react-native-svg";
const Flower1 = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    shapeRendering="crispEdges"
    viewBox="0 -0.5 16 16"
    {...props}
  >
    <Path
      stroke="#f5ba27"
      d="M6 4h1m2 0h1M4 6h1m1 0h1m2 0h1m1 0h1M4 9h1m1 0h1m2 0h1m1 0h1m-6 2h1m2 0h1"
    />
    <Path
      stroke="#ffec4f"
      d="M7 4h2M5 5h1m1 0h1m2 0h1M4 7h2m4 0h2M4 8h1m6 0h1m-7 2h1m1 0h1"
    />
    <Path
      stroke="#fed639"
      d="M6 5h1m1 0h2M5 6h1m4 0h1M5 8h1m4 0h1M5 9h1m4 0h1m-5 1h1m1 0h3m-4 1h2"
    />
    <Path stroke="#f19d25" d="M7 6h2M6 7h1m2 0h1M6 8h1m2 0h1M7 9h2" />
    <Path stroke="#d37d32" d="M7 7h1m0 1h1" />
    <Path stroke="#bd6a22" d="M8 7h1M7 8h1" />
  </Svg>
);
export default Flower1;
