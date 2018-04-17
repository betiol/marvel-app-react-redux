/**
 * Created by nikollasbetiol on 29/03/18.
 * @flow
 */

import React from 'react';
import { compose } from 'recompose';
import { debounce } from 'throttle-debounce';
import type { AppState } from '../reducers/index';
import type { Dispatch, Comics } from '../actions/types';
import { fetchMoreComics, filterResults, fetchComics } from '../actions/comics';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import Infinite from '../components/Infinite';
import { withStyles } from 'material-ui/styles';
import { LinearProgress } from 'material-ui';
import Spinner from 'react-spinkit';
import { ContainerWithSpaceTop } from '../util/styled';
import CardItem from '../components/CardItem';
import Filter from '../components/Filter';
type Props = {
	dispatch: Dispatch,
	isFetching: boolean,
	comics: Array<Comics>,
	hasMore: boolean,
	history: () => void,
	classes: () => void,
	isSearching: boolean
};

type State = {
	nameStartsWith: ?string
};

const styleSheet = (theme) => ({
	container: {
		padding: theme.spacing.unit * 2
	},
	itemCard: {
		display: 'flex'
	}
});

class ComicsScreen extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			nameStartsWith: ''
		};
		// this.loadMore = debounce(2000, this.loadMore);
	}

	_renderComicsList = () => {
		let { comics, classes } = this.props;
		return comics.map((item, idx) => {
			return (
				<Grid key={idx} item xs={12} sm={4} style={{ padding: 5 }} md={2} lg={2} className={classes.itemCard}>
					<CardItem
						onPress={() => this.props.history.push(`/comic/${item.id}`, { params: { item } })}
						imageSize={'portrait_incredible'}
						item={item}
					/>
				</Grid>
			);
		});
	};

	componentDidMount = () => {
		this.props.dispatch(fetchComics());
	};

	loadMore = async (offset: number) => {
		await this.props.dispatch(fetchMoreComics(offset));
	};

	onChange = (e: string) => {
		this.setState({ nameStartsWith: e.target.value });
	};

	keyPressed = async (e: string) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			await this.props.dispatch(filterResults(e.target.value));
		}
	};

	render() {
		const { classes, comics, isFetching, hasMore, isSearching } = this.props;
		return (
			<ContainerWithSpaceTop>
				<div style={{ padding: 10 }}>
					<Filter
						onChange={this.onChange}
						keyPressed={this.keyPressed}
						nameStartsWith={this.state.nameStartsWith}
						placeholder={'Pesquisar por nome do Quadrinho. Ex: Spider'}
					/>
				</div>
				{isFetching && <LinearProgress mode="indeterminate" />}
				<Infinite
					className={classes.container}
					hasMore={hasMore}
					message={'Carregando Quadrinhos...'}
					loadMore={(offset) => (isSearching ? null : this.loadMore(offset))}
				>
					<Grid container className={classes.contentCards} align={'center'}>
						{this._renderComicsList()}
					</Grid>
				</Infinite>
			</ContainerWithSpaceTop>
		);
	}
}

function select(state: AppState) {
	let { comics, isFetching, hasMore, isSearching } = state.comics;
	return {
		isFetching: isFetching && comics.length === 0,
		comics,
		hasMore,
		isSearching
	};
}

const enhance = compose(withStyles(styleSheet), connect(select));

export default enhance(ComicsScreen);
