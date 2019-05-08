import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine
} from "recharts";
import * as moment from "moment";

const series = [
  {
    name: "Actual Order",
    data: [
      { category: "1", value: 8 },
      { category: "2", value: 5 },
      { category: "3", value: 5.5 },
      { category: "4", value: 4.25 }
    ],
    stroke: "#ffc220"
  },
  {
    name: "HVI Prediction",
    data: [
      { category: "1", value: 6 },
      { category: "2", value: 5.5 },
      { category: "3", value: 4.25 },
      { category: "4", value: 5 }
    ],
    stroke: "#a0b5e8"
  },
  {
    name: "HVI Order",
    data: [
      { category: "8", value: 3.5 },
      { category: "9", value: 6, HVIRecommendedOrder: true }
    ],
    stroke: "#0065ff",
    strokeDasharray: "7 7"
  }
];

const CustomizedDot = props => {
  const { cx, cy, stroke, payload } = props;

  if (!payload.HVIRecommendedOrder) {
    return (
      <svg
        x={cx - 10}
        y={cy - 10}
        width={40}
        height={40}
        fill={stroke}
        viewBox="0 0 200 200"
      >
        <circle cx="50" cy="50" r="40" strokeWidth="3" fill={stroke} />
      </svg>
    );
  }

  return (
    <svg x={cx - 20} y={cy - 15} width={40} height={40} viewBox="0 0 200 200">
      <rect
        width="15"
        height="15"
        fill="white"
        stroke={stroke}
        strokeWidth="2"
        transform="matrix(3 3 -3 3 100 25)"
      />
    </svg>
  );
};

const CustomLine = props => {
  const { x, y } = props.viewBox;
  return (
    <text
      fontSize="10px"
      fontWeight="bold"
      fill="green"
      x={x}
      y={y - 10}
      className="recharts-text recharts-label"
      textAnchor="middle"
    >
      <tspan x={x} dy="0.355em">
        Activated 4/10
      </tspan>
    </text>
  );
};

export default class Example extends PureComponent {
  constructor(props) {
    super(props);

    this.tooltip = null;
  }

  customMouseOver = e => {
    let x = Math.round(e.cx);
    let y = Math.round(e.cy);

    this.tooltip.style.opacity = "1";
    this.tooltip.style.transform = `translate(${x}px, ${y}px)`;
    this.tooltip.childNodes[0].innerHTML = e.payload["value"];
  };

  over = e => {
    this.tooltip.style.opacity = "0";
  };

  xAxisTickFormatter(month) {
    return moment(month + "", "M")
      .format("MMM")
      .toUpperCase();
  }

  render() {
    return (
      <div>
        <LineChart width={900} height={300} margin={{ top: 20, right: 20 }}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="category"
            tick={{ fontSize: 14, fontWeight: "bold" }}
            domain={[1, 12]}
            tickCount={12}
            tickFormatter={this.xAxisTickFormatter}
            type="number"
            tickLine={false}
            allowDuplicatedCategory={false}
            padding={{ left: 30, right: 30 }}
          />
          <YAxis
            dataKey="value"
            tick={{ fontSize: 13, fill: "#6d6e71" }}
            domain={[0, "dataMax + 12"]}
            tickCount={20}
            allowDecimals={false}
            tickLine={false}
          />
          <Tooltip active={false} cursor={false} content={<div />} />
          <ReferenceLine
            x="8"
            strokeDasharray="5,5"
            stroke="green"
            label={<CustomLine />}
          />
          {series.map(s => (
            <Line
              activeDot={{
                onMouseOver: this.customMouseOver,
                onMouseLeave: this.over
              }}
              dataKey="value"
              dot={<CustomizedDot />}
              stroke={s.stroke}
              strokeDasharray={s.strokeDasharray}
              data={s.data}
              name={s.name}
              key={s.name}
            />
          ))}
        </LineChart>
        <div className="ui-chart-tooltip" ref={ref => (this.tooltip = ref)}>
          <div className="ui-chart-tooltip-content" />
        </div>
      </div>
    );
  }
}
