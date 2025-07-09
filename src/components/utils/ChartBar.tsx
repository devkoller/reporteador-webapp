import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { AppointmentType } from "@/types";

interface ChartBarProps {
  data?: any[];
  customData?: any[];
  keyColumn: keyof AppointmentType
  sortBy?: 'key' | 'count';
  handleFilter: (key: keyof AppointmentType, value: string) => void;
}

export const ChartBar = ({ data, customData, keyColumn, sortBy, handleFilter }: ChartBarProps) => {

  const count = data?.reduce<Record<string, number>>((acc, red) => {
    let key = red[keyColumn];
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});


  let sortedData: any = [];

  if (count) {
    if (sortBy === 'key') {
      if (count) { }
      sortedData = Object.entries(count)
        .map(([key, count]) => ({ [keyColumn]: key, count }))
        .sort((a, b) => {
          if (typeof a[keyColumn] === 'string' && typeof b[keyColumn] === 'string') {
            return a[keyColumn].localeCompare(b[keyColumn]);
          } else if (typeof a[keyColumn] === 'number' && typeof b[keyColumn] === 'number') {
            return a[keyColumn] - b[keyColumn];
          }
          return 0;
        });

    } else {
      sortedData = Object.entries(count)
        .map(([key, count]) => ({ [keyColumn]: key, count }))
        .sort((a, b) => b.count - a.count);
    }
  }


  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={sortedData > 0 ? sortedData : customData}
        onClick={(e) => {
          handleFilter(keyColumn, e.activeLabel || '');
        }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={keyColumn} />
        <YAxis />
        <Tooltip />
        <Bar type="monotone" dataKey="count" stroke="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  )
}




