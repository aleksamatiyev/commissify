import React from "react";
import { get, size } from 'lodash';
import { PageContainer } from '../../containers'
import { TITLES, RAMPING } from '../../containers/PageContainer'
import { RadioSelector, SliderInput, Result } from '../index'

const Simulating = () => {
	return (
		<div className="simulating">
			<h1>Simulating</h1>
			<RadioSelector title="title" data={TITLES} />
			<RadioSelector title="ramping" data={RAMPING} />
			<SliderInput />
			<Result />
		</div>
	);
}

export default Simulating