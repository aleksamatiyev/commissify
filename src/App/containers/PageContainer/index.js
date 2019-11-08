import { Container } from "unstated";
import mockData from '../../data/data.json';
import peopleData from '../../data/people.json';
import teamData from '../../data/team.json';

export const TITLES = ["Inbound SDR", "Senior Inbound SDR", "Outbound SDR", "Senior Outbound SDR"]
export const RAMPING = ['0.00', '0.5' , '0.75'];

export default class QuizContainer extends Container {
	constructor() {
		super();
		this.state = {
			mockData,
			peopleData,
			teamData,
			isTeamSelected: null,
			selectedID: null,
			selectedChart: null,
			selectedTeamMemberID: false,
			isSimulatingMode: false,
			title: TITLES[0],
			ramping: RAMPING[0],
			points: 0
		};
	}

	update(questionID, answer, idx) {
		const { answers, score } = this.state;
		const newScore = score + answer.score;
		answers[questionID] = answer;
		this.setState({ answers, score: newScore });
	}

	updateID(id) {
		this.setState({ selectedID:id });
	}

	toggleSimulatingMode(){
		const { isSimulatingMode } = this.state
		this.setState({ isSimulatingMode: !isSimulatingMode });
	}

	updateIsTeam(isTeam) {
		this.setState({ isTeamSelected: isTeam, isSimulatingMode: false });
	}

	updateSimulatprProps(propName, value) {
		this.setState({ [propName]: value });
	}

	toggleSelectedTeamMember(id) {
		const { selectedTeamMemberID } = this.state
		this.setState({ selectedTeamMemberID: selectedTeamMemberID === id ? false : id });
	}

	updateSelectedChart(idx) {
		this.setState({ selectedChart:idx });
	}

	onEmailChange(e) {
		let { email } = this.state;
		email = e.target.value;
		this.setState({ email });
	}

	formSubmitted() {
		const finalScore = Math.round(this.state.score);
		this.setState({ formSubmitted: true, score: finalScore });
	}

	toggleCheckbox = value => {
		const { selectedCheckboxes } = this.state;
		const index = selectedCheckboxes.indexOf(value);
		if (index > -1) {
			selectedCheckboxes.splice(index, 1);
		} else {
			selectedCheckboxes.push(value);
		}
		this.setState({ selectedCheckboxes });
	};
}
