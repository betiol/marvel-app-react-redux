import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Header from './components/Header';
const styleSheet = () => ({
	root: {
		display: 'flex',
		flexDirection: 'column'
	},
	navbarContainer: {
		flexGrow: 0
	},
	contentWrapper: {
		flex: 1,
		marginTop: 48,
		overflowY: 'scroll'
	}
});

const Layout = (props) => {
	const classes = props.classes;

	return (
		<div className={classes.root}>
			<div className={classes.navbarContainer}>
				<Header />
			</div>
		</div>
	);
};

Layout.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styleSheet)(Layout);
