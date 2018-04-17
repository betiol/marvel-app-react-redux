/**
 * Created by nikollasbetiol on 29/03/18.
 * @flow
 */

import React from 'react';
import { withRouter } from 'react-router';
import type { AppState } from '../reducers/index';
import type { Dispatch, Comics, Characters } from '../actions/types';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import { fetchComicById, fetchCharacter } from '../actions/characters';
import { compose } from 'recompose';
import Button from 'material-ui/Button';
import DescriptionIcon from 'material-ui-icons/Description';
import CardItem from '../components/CardItem';
import Carousel from 'nuka-carousel';
import CarouselContainer from '../components/CarouselContainer';
import Loader from '../components/Loader';
import ContainerWithImage from '../components/ContainerWithImage';
import NoHaveData from '../components/NoHaveData';
type Props = {
	dispatch: Dispatch,
	isFetching: boolean,
	comics: Array<Comics>,
	chars: Array<Characters>,
	classes: () => void,
	match: () => void,
	location: () => void,
	character: Array<Characters>,
	isFetchingCharacter: boolean
};

const styleSheet = (theme) => ({
	root: {
		paddingTop: 60
	},
	item: {
		display: 'flex',
		padding: theme.spacing.unit * 2,
		borderBottom: `1px solid ${theme.palette.grey[100]}`
	},
	col: {
		flex: 1
	},
	colRight: {
		flex: 1,
		paddingLeft: theme.spacing.unit * 2
	},
	title: {
		fontWeight: theme.typography.fontWeightMedium
	},
	header: {
		marginBottom: theme.spacing.unit
	},
	infoCard: {
		...theme.typography.body1,
		display: 'flex',
		alignItems: 'center',
		color: theme.palette.grey[500],
		marginRight: theme.spacing.unit * 2
	},
	infoCardCode: {
		fontWeight: theme.typography.fontWeightMedium
	},
	chip: {
		marginRight: theme.spacing.unit * 2
	},
	info: {
		display: 'flex',
		flexDirection: 'row'
	},
	infoCardIcon: {
		width: 16,
		height: 16,
		color: theme.palette.grey[500]
	},
	actions: {
		marginTop: theme.spacing.unit
	},
	actionsButton: {
		marginRight: theme.spacing.unit,
		fontSize: 12
	}
});

class CharacterDetails extends React.Component<Props, void> {
	componentDidMount = async () => {
		let { id } = this.props.match.params;
		this.props.dispatch(fetchCharacter(id));
		this.props.dispatch(fetchComicById(id));
	};

	renderCarousel = () => {
		let { comics } = this.props;
		return (
			<Carousel slidesToShow={4}>
				{comics.map((item) => {
					return (
						<CardItem
							key={item.id}
							imageSize={'portrait_incredible'}
							item={item}
							onPress={() =>
								this.props.history.push(`/comic/${item.id}`, {
									params: { item }
								})}
						/>
					);
				})}
			</Carousel>
		);
	};
	render() {
		const { classes, comics, isFetching, character, isFetchingCharacter } = this.props;
		let { item } = this.props.location.state.params;

		return (
			<div className={classes.root}>
				{isFetchingCharacter && <Loader size={50} message={'Carregando Herói...'} />}
				{character.map((item) => (
					<ContainerWithImage
						title={item.name}
						thumbnail={item.thumbnail}
						diamondCode={item.diamondCode}
						dates={item.dates}
						description={item.description}
						urls={item.urls}
						classes={classes}
					/>
				))}
				{comics.length === 0 ? (
					<NoHaveData message={'Nenhum Quadrinho relacionado a este Herói!'} />
				) : (
					<CarouselContainer type={'QUADRINHOS'} genre={'HERÓI'} classes={classes}>
						{isFetching ? <Loader size={50} message={'Carregando Quadrinhos...'} /> : this.renderCarousel()}
					</CarouselContainer>
				)}
			</div>
		);
	}
}

function select(state: AppState) {
	let { characters, isFetching, comics, character, isFetchingCharacter } = state.characters;

	return {
		isFetching: isFetching && characters.length === 0,
		characters,
		comics,
		character,
		isFetchingCharacter
	};
}

const enhance = compose(withStyles(styleSheet), connect(select));

export default enhance(withRouter(CharacterDetails));
