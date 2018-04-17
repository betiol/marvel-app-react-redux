/**
 * Created by nikollasbetiol on 29/03/18.
 * @flow
 */

import React from 'react';
import { compose } from 'recompose';
import type { AppState } from '../reducers/index';
import type { Dispatch, Characters } from '../actions/types';
import { fetchCharacters, fetchMoreCharacters, filterCharacters } from '../actions/characters';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import Infinite from '../components/Infinite';
import { withStyles } from 'material-ui/styles';
import CardItem from '../components/CardItem';
import { debounce } from 'throttle-debounce';
import { LinearProgress, TextField } from 'material-ui';
import Filter from '../components/Filter';
import { ContainerWithSpaceTop } from '../util/styled';

type Props = {
	dispatch: Dispatch,
	isFetching: boolean,
	characters: Array<Characters>,
	history: () => void,
	classes: () => void,
	hasMore: boolean,
	isSearching: boolean
};

type State = {
	nameStartsWith: string
};

const styleSheet = (theme) => ({
	container: {
		padding: theme.spacing.unit * 2
	},
	itemCard: {
		display: 'flex'
	}
});

class CharactersScreen extends React.Component<Props, State> {
	state: State = {
		nameStartsWith: ''
	};

	componentDidMount = async () => {
		await this.props.dispatch(fetchCharacters());
	};

	loadMore = async (offset: number) => {
		await this.props.dispatch(fetchMoreCharacters(offset));
	};

	onChange = (e: string) => {
		this.setState({ nameStartsWith: e.target.value });
	};

	keyPressed = async (e: string) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			return await this.props.dispatch(filterCharacters(e.target.value));
		}
	};

	_renderCharactersList = () => {
		let { characters, classes } = this.props;
		return characters.map((item) => {
			return (
				<Grid
					key={item.id}
					item
					xs={12}
					sm={4}
					style={{ padding: 5 }}
					md={2}
					lg={2}
					className={classes.itemCard}
				>
					<CardItem
						onPress={() =>
							this.props.history.push(`/character/${item.id}`, {
								params: { item }
							})}
						item={item}
						imageSize={'portrait_incredible'}
					/>
				</Grid>
			);
		});
	};

	render() {
		const { classes, isFetching, isSearching, hasMore } = this.props;

		return (
			<ContainerWithSpaceTop>
				<div style={{ padding: 10 }}>
					<Filter
						onChange={this.onChange}
						keyPressed={this.keyPressed}
						nameStartsWith={this.state.nameStartsWith}
						placeholder={'Pesquisar por nome do Herói'}
					/>
				</div>
				{isFetching && <LinearProgress mode="indeterminate" />}
				<Infinite
					className={classes.container}
					hasMore={hasMore}
					message={'Carregando Heróis...'}
					loadMore={(offset) => (isSearching ? null : this.loadMore(offset))}
				>
					<Grid container className={classes.contentCards} align={'center'}>
						{this._renderCharactersList()}
					</Grid>
				</Infinite>
			</ContainerWithSpaceTop>
		);
	}
}

function select(state: AppState) {
	let { characters, isFetching, isSearching, hasMore } = state.characters;

	return {
		isFetching: isFetching && characters.length === 0,
		characters,
		hasMore,
		isSearching
	};
}

const enhance = compose(withStyles(styleSheet), connect(select));

export default enhance(CharactersScreen);
