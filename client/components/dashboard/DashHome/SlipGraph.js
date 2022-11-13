import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const SlipGraph = ({graphData}) => {
  
    return (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart width={150} height={40} data={graphData}>
            <XAxis dataKey={"date"} fontSize={12} tickLine={false} />
            <YAxis dataKey={"earns"} fontSize={12} tickLine={false} />
            <Tooltip 
                wrapperStyle={{ outline: "none", }}  cursor={{ stroke: 'red', strokeWidth: 0 }} 
            />
            <Bar 
                dataKey="earns" fill="#8884d8"
                maxBarSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      );
};

export default SlipGraph;
