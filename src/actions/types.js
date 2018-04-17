/**
 * Created by nikollasbetiol on 29/03/18.
 * @flow
 */

export type Action =
	| { type: 'FETCH_COMICS' }
	| { type: 'FETCH_COMIC' }
	| { type: 'FETCH_CHARACTER' }
	| { type: 'FETCH_CHAR_BY_COMIC' }
	| { type: 'FETCH_CHAR_BY_COMIC_PENDING' }
	| { type: 'FETCH_CHAR_BY_COMIC_FULFILLED', payload: ComicsResponse }
	| { type: 'FETCH_CHAR_BY_COMIC_REJECTED', payload: Error }
	| { type: 'FETCH_COMICS_PENDING' }
	| { type: 'FILTER_COMICS_REQUEST' }
	| { type: 'FILTER_COMICS_REQUEST_PENDING' }
	| { type: 'FILTER_COMICS_REQUEST_FULFILLED', payload: ComicsResponse }
	| { type: 'FILTER_CHARACTERS' }
	| { type: 'FILTER_CHARACTERS' }
	| { type: 'FILTER_CHARACTERS_PENDING' }
	| { type: 'FILTER_CHARACTERS_FULFILLED', payload: CharactersResponse }
	| { type: 'FETCH_COMICS_REQUEST_PENDING' }
	| { type: 'FETCH_COMICS_FULFILLED', payload: ComicsResponse }
	| { type: 'FETCH_COMICS_REJECTED', payload: Error }
	| { type: 'FETCH_CHARACTERS' }
	| { type: 'FETCH_COMIC_BY_CHAR' }
	| { type: 'FETCH_COMIC_BY_CHAR_PENDING' }
	| { type: 'FETCH_COMIC_BY_CHAR_FULFILLED', payload: CharactersResponse }
	| { type: 'FETCH_COMIC_BY_CHAR_REJECTED', payload: Error }
	| { type: 'FETCH_COMIC_PENDING' }
	| { type: 'CLEAR_FILTER' }
	| { type: 'FETCH_CHARACTER_PENDING' }
	| { type: 'FETCH_COMIC_FULFILLED', payload: ComicsResponse }
	| { type: 'FETCH_COMIC_REJECTED', payload: Error }
	| { type: 'FETCH_CHARACTER_FULFILLED', payload: CharactersResponse }
	| { type: 'FETCH_CHARACTER_REJECTED', payload: Error }
	| { type: 'FETCH_CHARACTERS_PENDING' }
	| { type: 'FETCH_CHARACTERS_FULFILLED', payload: CharactersResponse }
	| { type: 'FETCH_CHARACTERS_REJECTED', payload: Error };

export type Comics = {
	id: number,
	title: string,
	description: string,
	resourceURI: string,
	collectionURI: string,
	urls: Array<Object>,
	series: Object,
	dates: Array<Object>,
	thumbnail: Object,
	images: Array<Object>,
	items: Array<Object>,
	characters: Object,
	total: number,
	prices: Array<Object>
};

export type Characters = {
	id: number,
	name: string,
	description: string,
	urls: Array<Object>,
	series: Object,
	thumbnail: Object,
	items: Array<Object>,
	comics: Array<Comics>
};

export type ComicsResponse = {
	comics: Array<Comics>
};

export type CharactersResponse = {
	comics: Array<Characters>
};

export type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
export type GetState = () => Object;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;
