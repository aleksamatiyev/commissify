import React from "react";
import { Subscribe } from 'unstated'
import { get, size } from 'lodash';
import { PageContainer } from '../../containers'

const HeadingCard = ({ pageState }) => {
	const { peopleData, selectedID, isTeamSelected, teamData } = pageState.state

	const getName = isTeamSelected ? `Team name: ${get(teamData, [selectedID,  "Team_Name"], '')}` : get(peopleData, [selectedID,  "Name"], '');
	const getRole = isTeamSelected ? `size: ${size(get(teamData, [selectedID,  "Team_Member"], []))}` : get(peopleData, [selectedID,  "Current_Role"], '');

	return (
		<div className="heading-card">
			<p>{getName}</p>
			<p>{getRole}</p>
			{isTeamSelected ? (
				<p>Manager: {get(teamData, [selectedID,  "Manager"], '')}</p>
			) : (
				<p>icon</p>
			)}
		</div>
	);
}

export { HeadingCard }

export default args => (
	<Subscribe to={[PageContainer]}>{pageState => <HeadingCard pageState={pageState} {...args} />}</Subscribe>
)
