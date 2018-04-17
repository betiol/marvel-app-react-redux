/**
 * Created by nikollasbetiol on 31/03/18.
 * @flow
 */

import React from 'react';
import { withStyles } from 'material-ui/styles';
import { Overlaid, HomeContainer, CardOverlay } from '../util/styled';
import { Grid, Paper } from 'material-ui';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import comics from '../sources/comics.jpg';
import heroes from '../sources/heroes.jpg';

const styleSheet = (theme) => ({
	root: {
		flexGrow: 1,
		justifyContent: 'center',
		height: '100vh',
		background: '#000',
		position: 'relative',
		overflow: 'hidden'
	},
	card: {
		maxWidth: 400
	},
	title: {
		fontFamily: 'BentonSansCompBlackRegular',
		fontSize: 50,
		textAlign: 'center',
		color: '#fff'
	}
});

const actions: Array<Object> = [
	{ path: '/comics', image: 'comics', title: 'QUADRINHOS', type: 'quadrinhos' },
	{ path: '/characters', title: 'HERÓIS', type: 'heróis' }
];

class HomeScreen extends React.Component<any, any> {
	_renderActions = () => {
		let { classes } = this.props;
		return actions.map((card, idx) => {
			let { image } = card;
			return (
				<Grid key={idx} item xs={12} sm={3}>
					<Card onClick={() => this.props.history.push(card.path)} className={classes.card}>
						<CardOverlay comics={image}>
							<div style={{ display: 'flex', flexDirection: 'column' }}>
								<Typography variant="display1" className={classes.title}>
									{card.title}
								</Typography>
								<Typography className="subtitle">veja mais sobre os {card.type} da marvel</Typography>
							</div>
						</CardOverlay>
					</Card>
				</Grid>
			);
		});
	};

	render() {
		let { classes } = this.props;

		return (
			<div className={classes.root}>
				<HomeContainer>
					<Grid
						container
						style={{ alignItems: 'center', justifyContent: 'center' }}
						xs={12}
						sm={12}
						spacing={24}
					>
						{this._renderActions()}
					</Grid>
				</HomeContainer>
			</div>
		);
	}
}

export default withStyles(styleSheet)(HomeScreen);
