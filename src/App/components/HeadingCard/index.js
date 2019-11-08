import React from "react";
import { Subscribe } from 'unstated'
import { get, size } from 'lodash';
import { PageContainer } from '../../containers'
import { AvatarIcon } from "../index"
import manager from '../../images/Person03.png';
import person0 from '../../images/Avatars-22.png';
import person1 from '../../images/Avatars-1.png';
import person2 from '../../images/Avatars-2.png';
import person3 from '../../images/Avatars-3.png';
import person4 from '../../images/Avatars-4.png';
import person5 from '../../images/Avatars-5.png';
import person6 from '../../images/Avatars-6.png';
import person7 from '../../images/Avatars-7.png';
import person8 from '../../images/Avatars-8.png';
import person9 from '../../images/Avatars-9.png';
import person10 from '../../images/Avatars-10.png';


const HeadingCard = ({ pageState }) => {
	const { peopleData, selectedID, isTeamSelected, teamData } = pageState.state

	const getName = isTeamSelected ? get(teamData, [selectedID,  "Team_Name"], '') : get(peopleData, [selectedID,  "Name"], '');
	const getRole = isTeamSelected ? `size: ${size(get(teamData, [selectedID,  "Team_Member"], []))}` : get(peopleData, [selectedID,  "Current_Role"], '');

	const getPeopleIds = Object.keys(peopleData)
	const idxInList = getPeopleIds.indexOf(selectedID.toString())

	const arrayOfAvatarts = [person0, person1, person2, person3, person4, person5, person6,person7, person8, person9, person10]
	const personAvatar = arrayOfAvatarts[idxInList % (arrayOfAvatarts.length - 1)]

	return (
		<div className="heading-card">
			<div className="role-info">
				<p>{getName}</p>
				<p>{getRole}</p>
			</div>
			<div className="avatar-info">
				<AvatarIcon src={isTeamSelected ? manager : personAvatar}/>
				{isTeamSelected && <p>{get(teamData, [selectedID,  "Manager"], '')}</p>}
			</div>
		</div>
	);
}

export { HeadingCard }

export default args => (
	<Subscribe to={[PageContainer]}>{pageState => <HeadingCard pageState={pageState} {...args} />}</Subscribe>
)
