/**
 * Created by nikollasbetiol on 29/03/18.
 * @flow
 */

import React from 'react';
import { withRouter } from 'react-router';
import type { AppState } from '../reducers/index';
import type { Dispatch, Comics } from '../actions/types';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import { fetchComicById, fetchComic } from '../actions/comics';
import { compose } from 'recompose';
import Button from 'material-ui/Button';
import moment from 'moment';
import DescriptionIcon from 'material-ui-icons/Description';
import DateRangeIcon from 'material-ui-icons/DateRange';
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
	chars: Array<Comics>,
	classes: () => void,
	match: () => void,
	location: () => void,
	comic: Array<Comics>,
	isFetchingComic: boolean
};

const styleSheet = (theme) => ({
	root: {
		flexDirection: 'column',
		paddingTop: 60,
		flexGrow: '1',
		justifyContent: 'center',
		alignItems: 'center',
		alignContent: 'center'
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
	},
	paper: {
		padding: theme.spacing.unit * 2,
		textAlign: 'center',
		color: theme.palette.text.secondary
	}
});

class ComicsDetails extends React.Component<Props, void> {
	componentDidMount = async () => {
		let { id } = this.props.match.params;

		await this.props.dispatch(fetchComic(id));
		await this.props.dispatch(fetchComicById(id));
	};

	renderCarousel = () => {
		let { chars, classes } = this.props;
		return (
			<div className={classes.paper}>
				<Carousel slidesToShow={4} style={{ border: '3px solid #fff' }}>
					{chars.map((item) => {
						return (
							<CardItem
								key={item.id}
								imageSize={'portrait_fantastic'}
								item={item}
								onPress={() =>
									this.props.history.push(`/character/${item.id}`, {
										params: { item }
									})}
							/>
						);
					})}
				</Carousel>
			</div>
		);
	};
	render() {
		const { classes, isFetching, chars, isFetchingComic, comic } = this.props;
		return (
			<div className={classes.root}>
				{isFetchingComic && <Loader size={50} message={'Carregando Quadrinho...'} />}
				{comic.map((item) => (
					<ContainerWithImage
						title={item.title}
						thumbnail={item.thumbnail}
						diamondCode={item.diamondCode}
						pageCount={item.pageCount}
						dates={item.dates}
						description={item.description}
						urls={item.urls}
						classes={classes}
						prices={item.prices}
					/>
				))}
				{chars.length === 0 ? (
					<NoHaveData message={'Nenhum Herói relacionado a este Quadrinho!'} />
				) : (
					<CarouselContainer type={'HERÓIS'} genre={'QUADRINHO'} classes={classes}>
						{isFetching ? <Loader size={50} message={'Carregando Heróis...'} /> : this.renderCarousel()}
					</CarouselContainer>
				)}
			</div>
		);
	}
}

function select(state: AppState) {
	let { comics, isFetching, chars, isFetchingComic, comic } = state.comics;
	return {
		isFetching: isFetching && comics.length === 0,
		comics,
		chars,
		comic,
		isFetchingComic
	};
}

const enhance = compose(withStyles(styleSheet), connect(select));

export default enhance(withRouter(ComicsDetails));
