import React from "react";
import { Subscribe } from 'unstated'
import { get, size } from 'lodash';
import { Link } from "react-router-dom";
import cx from 'classnames';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { PageContainer } from '../../containers'
import { AvatarIcon } from "../index"
import manager from '../../images/Person03.png';
import person from '../../images/Avatars-22.png';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

const PeopleList = ({ pageState }) => {
	const { peopleData, selectedID, isTeamSelected, teamData } = pageState.state
	const getPeopleIds = Object.keys(peopleData)
	const classes = useStyles();

	const PeopleListSelector = () => (
			<ul className="people-list"> 
				{getPeopleIds.map(id => (
					<li className={cx({'selected': parseInt(id, 10) === selectedID })} key={id}>
						<Link to={`/${id}`}>
							{peopleData[id]["Name"]}
						</Link>
					</li>
				))}
			</ul>
		)
	
	const Navigation = () => {
		const idxInList = getPeopleIds.indexOf(selectedID.toString())
		const nextId = idxInList === getPeopleIds.length - 1 ? getPeopleIds[0] : getPeopleIds[idxInList + 1]
		return(
			<div className="navigation">
					<Link to={`/${nextId}`}>
						<Button variant="contained" className={classes.button}>
							View Next
						</Button>
					</Link>
			</div>
		)
	}

	return (
		<div>
			{selectedID && <Navigation />}
		</div>
	);
}

export { PeopleList }

export default args => (
	<Subscribe to={[PageContainer]}>{pageState => <PeopleList pageState={pageState} {...args} />}</Subscribe>
)
