import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export function EEGLine({ data }: { data: { t: number; v: number }[] }) {
  return (
    <div className="h-64 rounded-2xl border bg-white p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="t" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="v" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
