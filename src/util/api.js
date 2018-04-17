/**
 * Created by nikollasbetiol on 29/03/18.
 * @flow
 */

import config from "./config";
import type { ComicsResponse, CharactersResponse } from "../actions/types";
import moment from "moment";
export default class Api {
  static async fetchResource(
    method: string = "GET",
    endpoint: string = "/",
    limit: number = 12,
    offset: number = 1,
    titleStartsWith: string,
    nameStartsWith: string
  ) {
    let headers = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json"
    });
    let count: number = 12;
    const currentOffset = offset === 1 ? 0 : count * (offset - 1);

    let params = `?ts=${config.timeStamp}&apikey=${config.apiKey}&hash=${
      config.hash
    }&limit=${count}&offset=${currentOffset}`;

    var uri: string = config.baseUrl + endpoint + params;

    if (titleStartsWith) {
      uri = uri + `&titleStartsWith=${titleStartsWith}`;
    }
    if (nameStartsWith) {
      uri = uri + `&nameStartsWith=${nameStartsWith}`;
    }

    let response = await fetch(uri, { method, headers });

    if (!response.ok) {
      let type = response.headers.get("Content-type");
      if (type && type.indexOf("json") !== -1) {
        let jsonResponse: Function = await response.json();
        throw new Error(jsonResponse.message);
        return jsonResponse;
      } else {
        let textResponse = await response.text();
        throw new Error(textResponse);
      }
    }

    try {
      return await response.json();
    } catch (e) {
      return {};
    }
  }

  static async getListResource(
    endpoint: string,
    limit: number,
    offset: number,
    titleStartsWith: string,
    nameStartsWith: string
  ) {
    return Api.fetchResource(
      "GET",
      endpoint,
      12,
      offset,
      titleStartsWith,
      nameStartsWith
    );
  }

  static async comics(): Promise<ComicsResponse> {
    let res = await Api.getListResource("comics", 12, 1);
    return res;
  }

  static async characters(): Promise<CharactersResponse> {
    let res = await Api.getListResource("characters", 12, 1);
    return res;
  }

  static async fetchComicsByCharacterId(
    id: number
  ): Promise<CharactersResponse> {
    let res = await Api.getListResource(`characters/${id}/comics`);
    return res.data.results;
  }

  static async fetchComic(id: number): Promise<ComicsResponse> {
    let res = await Api.getListResource(`comics/${id}`);
    return res;
  }

  static async fetchCharacter(id: number): Promise<CharactersResponse> {
    let res = await Api.getListResource(`characters/${id}`);
    return res;
  }

  static async loadMoreComics(offset: number): Promise<ComicsResponse> {
    let res = await Api.getListResource("comics", 12, offset);
    return res;
  }

  static async loadMoreCharacters(offset: number): Promise<CharactersResponse> {
    let res = await Api.getListResource("characters", 12, offset);
    return res;
  }

  static async fetchCharactersFromComicId(id: number): Promise<ComicsResponse> {
    let res = await Api.getListResource(`comics/${id}/characters`);
    return res.data.results;
  }

  static async filterComics(titleStartsWith: string): Promise<ComicsResponse> {
    let res = await Api.getListResource(`comics`, 12, 1, titleStartsWith);
    return res;
  }

  static async filterCharacters(
    nameStartsWith: string
  ): Promise<CharactersResponse> {
    let res = await Api.getListResource(
      `characters`,
      12,
      1,
      null,
      nameStartsWith
    );
    return res;
  }
}
