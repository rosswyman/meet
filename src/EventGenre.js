import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const EventGenre = ({ events }) => {
	const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];
	const colors = ['#ff0000', '#008000', '#0000ff', '#ffa500', '#800080'];

	const getData = () => {
		let data = genres.map((genre) => {
			const value = events.filter((event) =>
				event.summary.split(' ').includes(genre)
			).length;
			return { name: genre, value };
		});
		data = data.filter((data) => data.value);
		return data;
	};

	useEffect(() => {
		setData(() => getData());
	}, [events]);
	const [data, setData] = useState([]);

	return (
		<ResponsiveContainer height={400}>
			<PieChart width={400} height={400}>
				<Pie
					data={data}
					cx={200}
					cy={200}
					labelLine={false}
					outerRadius={80}
					fill="8884d8"
					dataKey="value"
					label={({ name, percent }) =>
						`${name} ${(percent * 100).toFixed(0)}%`
					}
				>
					{data.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={colors[index]} />
					))}
				</Pie>
			</PieChart>
		</ResponsiveContainer>
	);
};
export default EventGenre;
