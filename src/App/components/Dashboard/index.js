import React from "react";
import { Subscribe } from 'unstated'
import { get } from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import cx from 'classnames';
import { PageContainer } from '../../containers'
import { Chart, ChartInfoCard, SelectFromTeam, Simulating } from "../index"

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
	},
	
	selected: {
		background: "#e3e4e5"
	}
}));

const Dashboard = ({ pageState }) => {
	const { mockData, peopleData, selectedID, isTeamSelected, isSimulatingMode } = pageState.state
	const classes = useStyles();

	const Heading = () => {
		return(
			<>
			{isTeamSelected ? <h1>Dashboard</h1> : <ToolTabs />}
			</>
		)
	}

	const toggleSimulatingMode = () => {
		pageState.toggleSimulatingMode()
	}

	const ToolTabs = () => {
		return(
			<ul className="tab-tools">
				<li>
					<Button 
						disabled={!isSimulatingMode} 
						className={cx(classes.button, {[classes.selected]: !isSimulatingMode })}
						onClick={toggleSimulatingMode}
						>
							Overview
					</Button>
				</li>
				<li>
					<Button 
						disabled={isSimulatingMode} 
						className={cx(classes.button, {[classes.selected]: isSimulatingMode })}
						onClick={toggleSimulatingMode}
					>
						Simulating
					</Button>
				</li>
			</ul>
		)
	}

	return (
		<div className="dashboard">
			<Heading />
			{isSimulatingMode ? <Simulating /> :(
				<div className="dashboard-content">
					<Chart />
					{isTeamSelected && <SelectFromTeam />}
					{/* disable for now for team */}
					{!isTeamSelected && <ChartInfoCard />}
				</div>
			)}
			
		</div>
	);
}

export { Dashboard }

export default args => (
	<Subscribe to={[PageContainer]}>{pageState => <Dashboard pageState={pageState} {...args} />}</Subscribe>
)
