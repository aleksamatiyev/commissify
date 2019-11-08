import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Subscribe } from 'unstated'
import { PageContainer } from '../../containers'

const useStyles = makeStyles(theme => ({
	formControl: {
		margin: theme.spacing(3),
	},
}));

const RadioSelector = ({ title, data, pageState }) => {
	const classes = useStyles();
	const [value, setValue] = React.useState(data[0]);

	const handleChange = event => {
		setValue(event.target.value);
		pageState.updateSimulatprProps(title, event.target.value)
	};

	return (
		<FormControl component="fieldset" className={classes.formControl}>
			<FormLabel component="legend">{title}</FormLabel>
			<RadioGroup aria-label={title} name={title} value={value} onChange={handleChange}>
			{data.map((item, idx) =>
					<FormControlLabel
						key={idx}
						value={item}
						control={<Radio color="primary" />}
						label={item}
						labelPlacement="start"
					/>
				)}
			</RadioGroup>
		</FormControl>
	)
}

export { RadioSelector }

export default args => (
	<Subscribe to={[PageContainer]}>{pageState => <RadioSelector pageState={pageState} {...args} />}</Subscribe>
)