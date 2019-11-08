import React from "react";
import { get, size } from 'lodash';
import { PageContainer } from '../../containers'
import { TITLES, RAMPING } from '../../containers/PageContainer'
import { RadioSelector, SliderInput, Result } from '../index'

const Simulating = () => {
	return (
		<div className="simulating">
			<div className="simulating-input-group">
				<RadioSelector title="title" data={TITLES} />
				<RadioSelector title="ramping" data={RAMPING} />
				<SliderInput />
			</div>
			<Result />
		</div>
	);
}

export default Simulating