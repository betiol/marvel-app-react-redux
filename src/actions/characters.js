/**
 * Created by nikollasbetiol on 30/03/18.
 * @flow
 */

import Api from '../util/api';

import type { Action } from './types';

export function fetchCharacters(): Action {
	return {
		type: 'FETCH_CHARACTERS',
		payload: Api.characters()
	};
}

export function fetchComicById(id: number): Action {
	return {
		type: 'FETCH_COMIC_BY_CHAR',
		payload: Api.fetchComicsByCharacterId(id)
	};
}

export function fetchMoreCharacters(offset: number): Action {
	return {
		type: 'FETCH_CHARACTERS',
		payload: Api.loadMoreCharacters(offset)
	};
}

export function filterCharacters(nameStartsWith: string): Action {
	return {
		type: 'FILTER_CHARACTERS',
		payload: Api.filterCharacters(nameStartsWith)
	};
}

export function fetchCharacter(id: number): Action {
	return {
		type: 'FETCH_CHARACTER',
		payload: Api.fetchCharacter(id)
	};
}
