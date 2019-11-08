import React from "react";
import { Subscribe } from 'unstated'
import { PageContainer } from '../../containers'
import { HeadingCard, DropDown, Dashboard } from '../../components' 
import { Link } from "react-router-dom";

const Page = ({ match: { params: { id } }, isTeam, pageState, ...props }) => {
	const { mockData, teamData, selectedID, isTeamSelected, selectedTeamMemberID } = pageState.state
	let cardId = parseInt(id, 10)
	// render first person if no id
	if (!cardId) {
		cardId = isTeam ? Object.keys(teamData)[0]: Object.keys(mockData)[0]
		const path = isTeam ? `/team/${cardId}` : cardId
		props.history.push(path)
	}

	// update is Team
	if (isTeamSelected !== isTeam) {
		pageState.updateIsTeam(isTeam)
	}

	// remove selectedID if Team not selected
	if ((selectedTeamMemberID && !isTeamSelected) || (selectedTeamMemberID && !isTeam)) {
		pageState.toggleSelectedTeamMember(selectedTeamMemberID)
	}

	// update selected ID on state
	if (!selectedID || selectedID !== cardId) {
		pageState.updateID(cardId)
	}
		
    return (
      <div className="App">
				{isTeam ? (
					<Link to="/5114">
						<button type="button">
							People
						</button>
					</Link>) : (
					<Link to="/team/1234">
						<button type="button">
							Team
						</button>
					</Link>
					)
				}
				
       <div className="top">
				 <HeadingCard {...props}/>
				 <DropDown />
			 </div>
			 <section>
				 <Dashboard />
			 </section>
      </div>
    );
}

export { Page }

export default args => (
	<Subscribe to={[PageContainer]}>{pageState => <Page pageState={pageState} {...args} />}</Subscribe>
)
