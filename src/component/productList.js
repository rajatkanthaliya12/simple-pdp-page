import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine
} from "recharts";
import * as moment from "moment";

const series = [
  {
    name: "Actual Order",
    data: [
      { orderDate: "1", value: 8 },
      { orderDate: "2", value: 5 },
      { orderDate: "3", value: 5.5 },
      { orderDate: "4", value: 4.25 }
    ],
    stroke: "#ffc220"
  },
  {
    name: "HVI Prediction",
    data: [
      { orderDate: "1", value: 6 },
      { orderDate: "2", value: 5.5 },
      { orderDate: "3", value: 4.25 },
      { orderDate: "4", value: 5 }
    ],
    stroke: "#a0b5e8"
  },
  {
    name: "HVI Order",
    data: [
      { orderDate: "8", value: 6 },
      { orderDate: "9", value: 4.5, HVIRecommendedOrder: true }
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
    this.tooltipQty = null;
    this.tooltipDate = null;
  }

  customMouseOver = (e, name) => {
    let x = Math.round(window.event.clientX);
    let y = Math.round(window.event.clientY);
    this.tooltip.style.opacity = "1";
    this.tooltip.style.transform = `translate(${x - 120}px, ${y - 140}px)`;
    this.tooltipQty.innerHTML = e.payload["value"];
    this.tooltipDate.innerHTML = moment(e.payload["orderDate"] + "", "M")
      .format("MMM")
      .toUpperCase();
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
        <div className="chart-legend">
          <div className="actual-order">
            <span className="sign" />
            <span className="name">Actual Orders</span>
          </div>
          <div className="HVI-prediction">
            <span className="sign" />
            <span className="name">HVI Prediction <br/> (while inactive)</span>
          </div>
          <div className="HVI-order">
            <span className="sign" />
            <span className="name">HVI Order <br/> (while active)</span>
          </div>
          <div className="HVI-rec-order">
            <span className="sign" />
            <span className="name">HVI Recommended Order</span>
          </div>
        </div>

        <LineChart width={900} height={300} margin={{ top: 20, right: 20 }}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="orderDate"
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
          <Tooltip cursor={false} wrapperStyle={{ display: "none" }} />
          <ReferenceLine
            x="7"
            strokeDasharray="5,5"
            stroke="green"
            label={<CustomLine />}
          />
          {series.map(s => (
            <Line
              activeDot={{
                onMouseOver: e => this.customMouseOver(e, s.name),
                onMouseLeave: this.over
              }}
              isAnimationActive={false}
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
          <div className="ui-chart-tooltip-content">
            <div className="tooltip-heading">Inventory Order</div>
            <div className="qty">
              <div className="name">Qty (Cases)</div>
              <div ref={ref => (this.tooltipQty = ref)} className="value" />
            </div>
            <div className="date">
              <div className="name">Date of Order</div>
              <div ref={ref => (this.tooltipDate = ref)} className="value" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
