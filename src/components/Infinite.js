/**
 * Created by nikollasbetiol on 31/03/18.
 * @flow
 */

import React from "react";
import type { Element } from "react";
import InfiniteScroll from "react-infinite-scroller";
import Spinner from "react-spinkit";
import Loader from "../components/Loader";

type Props = {
  className: string,
  hasMore: boolean,
  loadMore: Function,
  message: string,
  children: Element<*>
};

const Infinite = (props: Props) => {
  return (
    <InfiniteScroll
      className={props.className}
      pageStart={1}
      element={"div"}
      hasMore={props.hasMore}
      loadMore={props.loadMore}
      threshold={500}
      useWindow={true}
      loader={<Loader size={50} message={props.message} />}
    >
      {props.children}
    </InfiniteScroll>
  );
};

export default Infinite;
