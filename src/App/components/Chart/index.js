import React from "react";
import { Subscribe } from 'unstated'
import { get } from 'lodash';
import { Bar } from 'react-chartjs-2';
import Icon from '@material-ui/core/Icon';
import { PageContainer } from '../../containers'

const failBgColor = 'rgba(255, 99, 132, OPACITY)';
const successBgColor = 'rgba(113,140,0, OPACITY)';

const backgroundColorOpacity = "0.2"
const borderColorOpacity = "1"
const hoverBackgroundColorOpacity = "0.4"

const ChartComponent = ({ pageState }) => {
	const { mockData, selectedID, selectedChart, isTeamSelected, teamData, selectedTeamMemberID} = pageState.state
	// is selectedTeamMemberID -> render person data
	let currentSelectedId = selectedTeamMemberID ? selectedTeamMemberID : selectedID
	const personData = get(mockData, currentSelectedId, {})
	const teamDataObj = get(teamData, [selectedID, "q2_2019"], {})
	const chartData = isTeamSelected && !selectedTeamMemberID ? teamDataObj : personData

	const labels = Object.keys(chartData)
	const bonus = Object.values(chartData).reduce((curr, acc) => {
		if (isTeamSelected && !selectedTeamMemberID){
			curr.push(acc['Total_Bonus_Earned'] ? acc['Total_Bonus_Earned'] : 0)
		} else {
			curr.push(acc['Bonus'] ? acc['Bonus'] : 0)
		}
		return curr
	}, [])

	const chartColor = Object.values(chartData).reduce((curr, acc) => {
		let quota = 0
		let points = 0
		if (isTeamSelected && !selectedTeamMemberID){
			quota = acc['Total_Quota'] || 0
			points = acc['Total_Points'] || 0
		} else {
			quota = acc['Demo Quota'] || 0
			points = acc['Demo_Points'] || 0
		}

		curr.push(points / quota > 1 ? successBgColor : failBgColor)
		return curr
	}, [])

	const backgroundColor = chartColor.map(color => color.replace("OPACITY", backgroundColorOpacity));
	const borderColor = chartColor.map(color => color.replace("OPACITY", borderColorOpacity));
	const hoverBackgroundColor = chartColor.map(color => color.replace("OPACITY", hoverBackgroundColorOpacity));

	if (selectedChart == null && !isTeamSelected) {
		pageState.updateSelectedChart(labels[labels.length - 1])
	}

	// click only for person data
	function graphClickEvent(event, array) {
		if (array[0] && !isTeamSelected) {
			pageState.updateSelectedChart(labels[array[0]._index])
		}
	}

	const data = {
		labels,
		datasets: [
			{
				label: 'Bonus',
				backgroundColor: backgroundColor,
				borderColor: borderColor,
				borderWidth: 1,
				hoverBackgroundColor: hoverBackgroundColor,
				hoverBorderColor: borderColor,
				data: bonus
			}
		]
	};

	// temp data to download
	const downloadIconClick = () => {
		let csvContent = "data:text/csv;charset=utf-8," 
		+ bonus.join(",");
		var encodedUri = encodeURI(csvContent);
		var link = document.createElement("a");
		link.setAttribute("href", encodedUri);
		link.setAttribute("download", "my_data_bonus.csv");
		document.body.appendChild(link); // Required for FF

		link.click();
	}


	return (
		<div className="chart">
			<div className="download-icon" onClick={downloadIconClick}>
				<i class="material-icons">cloud_download</i>
			</div>
			<Bar
				data={data}
				width={100}
				height={50}
				options={{
					maintainAspectRatio: true,
					onClick: graphClickEvent
				}}
			/>
		</div>
	);
}

export { ChartComponent }

export default args => (
	<Subscribe to={[PageContainer]}>{pageState => <ChartComponent pageState={pageState} {...args} />}</Subscribe>
)
