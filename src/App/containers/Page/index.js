import React from "react";
import { Subscribe } from 'unstated'
import { PageContainer } from '../../containers'
import { HeadingCard, DropDown, Dashboard, PeopleList } from '../../components'
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));


const Page = ({ match: { params: { id } }, isTeam, pageState, ...props }) => {
	const { mockData, teamData, selectedID, isTeamSelected, selectedTeamMemberID, isSimulatingMode } = pageState.state
	const classes = useStyles();
	let cardId = parseInt(id, 10)
	// render first person if no id (set specific for prople to demo)
	if (!cardId) {
		cardId = isTeam ? Object.keys(teamData)[0] : '5114'
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

	const Navigation = () => {
		return(
			<div className="navigation">
				{isTeam ? (
					<Link to="/5114">
						<Button variant="contained" className={classes.button}>
							People
						</Button>
					</Link>) : (
						<Link to="/team/1234">
							<Button variant="contained" className={classes.button}>
								Team
							</Button>
						</Link>
					)
				}
			</div>
		)
	}

	return (
		<div className="App">
			<div className="top">
				{selectedID && <HeadingCard {...props} />}
				<DropDown />
			</div>
			<section>
				<Dashboard />
			</section>
			<div className="group-navigation">
				{!selectedTeamMemberID && !isTeamSelected && (
					<PeopleList />
				)}
				<Navigation />		
			</div>
		</div>
	);
}

export { Page }

export default args => (
	<Subscribe to={[PageContainer]}>{pageState => <Page pageState={pageState} {...args} />}</Subscribe>
)
