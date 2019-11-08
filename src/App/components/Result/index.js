import React from "react";
import { Subscribe } from 'unstated'
import { PageContainer } from '../../containers'
import { getResultBonus } from "../../utils"

const Result = ({ pageState }) => {
	const { title, ramping, points } = pageState.state
	console.log(title, ramping, points)
	const resultBonus = getResultBonus(title, ramping, points)
	return (
		<div className="heading-card">
			<p>Result: {resultBonus}</p>
		</div>
	);
}

export { Result }

export default args => (
	<Subscribe to={[PageContainer]}>{pageState => <Result pageState={pageState} {...args} />}</Subscribe>
)
