import React from "react";
import { Subscribe } from 'unstated'
import { get, size } from 'lodash';
import { PageContainer } from '../../containers'
import { AvatarIcon } from "../index"
import manager from '../../images/Person03.png';
import person from '../../images/Avatars-22.png';

const HeadingCard = ({ pageState }) => {
	const { peopleData, selectedID, isTeamSelected, teamData } = pageState.state

	const getName = isTeamSelected ? get(teamData, [selectedID,  "Team_Name"], '') : get(peopleData, [selectedID,  "Name"], '');
	const getRole = isTeamSelected ? `size: ${size(get(teamData, [selectedID,  "Team_Member"], []))}` : get(peopleData, [selectedID,  "Current_Role"], '');

	return (
		<div className="heading-card">
			<div className="role-info">
				<p>{getName}</p>
				<p>{getRole}</p>
			</div>
			<div className="avatar-info">
				<AvatarIcon src={isTeamSelected ? manager : person}/>
				{isTeamSelected && <p>{get(teamData, [selectedID,  "Manager"], '')}</p>}
			</div>
		</div>
	);
}

export { HeadingCard }

export default args => (
	<Subscribe to={[PageContainer]}>{pageState => <HeadingCard pageState={pageState} {...args} />}</Subscribe>
)
