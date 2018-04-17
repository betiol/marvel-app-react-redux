/**
 * Created by nikollasbetiol on 29/03/18.
 * @flow
 */

import React from 'react';
import { TextField } from 'material-ui';

type Props = {
	nameStartsWith: string,
	onChange: Function,
	keyPressed: Function,
	placeholder: string
};

const Filter = (props: Props) => {
	return (
		<div style={{ padding: 10, borderRadius: 5, width: '98%' }}>
			<TextField
				id="full-width"
				label={'Pesquisar'}
				InputLabelProps={{
					shrink: true
				}}
				value={props.nameStartsWith}
				onChange={props.onChange}
				onKeyPress={props.keyPressed}
				placeholder={props.placeholder}
				fullWidth
				style={{
					color: '#fff',
					backgroundColor: '#fff',
					padding: 10,
					fontFamily: 'BentonSansCompBlackRegular'
				}}
				margin="normal"
			/>
		</div>
	);
};

export default Filter;
