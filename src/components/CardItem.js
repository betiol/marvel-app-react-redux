/**
 * Created by nikollasbetiol on 02/04/18.
 * @flow
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import { Overlaid } from '../util/styled';

type Props = {
	onPress: Function,
	item: Array<Object>,
	classes: Object,
	imageSize: string
};

const styleSheet = ({ shadows, palette, spacing, typography, transitions }) => ({
	card: {
		height: 350,
		width: 300,
		backgroundSize: 'cover',
		border: 0,
		backgroundPosition: 'center center',
		flexGrow: 1,
		position: 'relative',
		boxShadow: shadows[3],
		overflow: 'hidden',
		borderRadius: 4,
		transition: 'all .400s ease',
		cursor: 'pointer',
		transform: 'perspective(500px) translateZ(1px)',
		zIndex: 1,
		transitionTimingFunction: transitions.easing.easeInOut,
		'&:focus': {
			outline: 'none'
		},
		'&:hover': {
			boxShadow: shadows[12],
			zIndex: 9,
			transform: 'perspective(500px) translateZ(20px)'
		}
	},
	title: {
		fontFamily: 'BentonSansCompBlackRegular',
		fontSize: 20,
		color: palette.common.white,
		fontWeight: typography.fontWeightMedium,
		color: '#fff'
	},
	comics: {
		color: palette.common.white,
		fontSize: 12
	},
	textContainer: {
		position: 'absolute',
		zIndex: 3,
		bottom: 0,
		left: 0,
		textAlign: 'left',
		margin: spacing.unit * 2
	}
});

const CardItem = ({ classes, item, onPress, imageSize }): Props => {
	const image = `${item.thumbnail.path}/${imageSize}.${item.thumbnail.extension}`;
	let haveAvailables = (item.characters && item.characters.available >= 1) || '';
	return (
		<button onClick={(e) => onPress(e)} className={classes.card} style={{ backgroundImage: `url(${image})` }}>
			<Overlaid className={classes.overlay}>
				<div className={classes.textContainer}>
					<Typography className={classes.title} type="subheading" gutterBottom>
						{item.title || item.name}
					</Typography>
					<Typography className={classes.comics} type="body2" gutterBottom>
						{haveAvailables ? `${item.characters.available} Personagens` : 'Nenhum Personagem'}
					</Typography>
				</div>
			</Overlaid>
		</button>
	);
};

CardItem.propTypes = {
	classes: PropTypes.object.isRequired,
	item: PropTypes.object,
	onPress: PropTypes.func
};

export default withStyles(styleSheet)(CardItem);
