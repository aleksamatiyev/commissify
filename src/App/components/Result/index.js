import React from "react";
import { Subscribe } from 'unstated'
import { PageContainer } from '../../containers'
import { getResultBonus } from "../../utils"

const Result = ({ pageState }) => {
	const { title, ramping, points } = pageState.state
	const resultBonus = getResultBonus(title, ramping, points)
	return (
		<div className="result-card">
			<h1>Bonus: {resultBonus}</h1>
		</div>
	);
}

export { Result }

export default args => (
	<Subscribe to={[PageContainer]}>{pageState => <Result pageState={pageState} {...args} />}</Subscribe>
)
