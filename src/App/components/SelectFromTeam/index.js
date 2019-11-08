import React from "react";
import { Subscribe } from 'unstated'
import { get } from 'lodash';
import { PageContainer } from '../../containers'
import cx from 'classnames';

const SelectFromTeam = ({ pageState }) => {
	const { selectedID, teamData, peopleData, selectedTeamMemberID } = pageState.state
	const teamMemberIDs = get(teamData, [selectedID, 'Team_Member'], [])
	const handleClick = (id) => {
		pageState.toggleSelectedTeamMember(id)
	}
	const listMembers = teamMemberIDs.map((id) =>
		<li 
			key={id} 
			onClick={() => handleClick(id)}
			className={cx({'selected': selectedTeamMemberID === id })}
		>
			{get(peopleData, [id,  "Name"], '')}
		</li>
  	);

	return (
		<div className="chart-info-card">
			<h1>Members</h1>
			<ul className="members-list">{listMembers}</ul>
		</div>
	);
}
export { SelectFromTeam }

export default args => (
	<Subscribe to={[PageContainer]}>{pageState => <SelectFromTeam pageState={pageState} {...args} />}</Subscribe>
)
