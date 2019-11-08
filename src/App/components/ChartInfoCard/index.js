import React from "react";
import { Subscribe } from 'unstated'
import { get } from 'lodash';
import moment from 'moment';
import { PageContainer } from '../../containers'

const ChartInfoCard = ({ pageState }) => {
	const { mockData, selectedID, selectedChart, isTeamSelected, teamData, selectedTeamMemberID } = pageState.state
	const personData = get(mockData, selectedID, {})
	const teamDataObj = get(teamData, [selectedID, "q2_2019"], {})
	const chartData = isTeamSelected && !selectedTeamMemberID ? teamDataObj : personData	
	const goalPoints = get(chartData, [selectedChart, 'Demo_Points'], '')
	const ramping = get(chartData, [selectedChart, 'Ramping Demo Quota (%)'], '')
	const goalQuota = get(chartData, [selectedChart, 'Demo Quota'], '')
	const bonus = get(chartData, [selectedChart, 'Bonus'], '')

	return (
		<div className="chart-info-card">
			{selectedChart && (
				<>
					<h1>{moment(selectedChart).format('MMMM YYYY')}</h1>
					<table>
						<tbody>
							<tr>
								<td>Goal Points</td>
								<td>{goalPoints}</td>
							</tr>
							<tr>
								<td>Ramping Demo Quota (%)</td>
								<td>{ramping}</td>
							</tr>
							<tr>
								<td>Goal Quota</td>
								<td>{goalQuota}</td>
							</tr>
							<tr>
								<td>Bonus</td>
								<td>{bonus}</td>
							</tr>
						</tbody>
					</table>
				</>
			)
			}
		</div>
	);
}

export { ChartInfoCard }

export default args => (
	<Subscribe to={[PageContainer]}>{pageState => <ChartInfoCard pageState={pageState} {...args} />}</Subscribe>
)
