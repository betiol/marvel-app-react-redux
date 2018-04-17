import styled from 'styled-components';
import background from '../sources/background.jpg';
import comics from '../sources/comics.jpg';
import heroes from '../sources/heroes.jpg';

export const Overlaid = styled.div`
	position: absolute;
	flex: 1;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	z-index: 1;
	background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8));
`;

export const ContainerWithSpaceTop = styled.div`padding-top: 50px;`;

export const HomeContainer = styled.div`
	height: 100vh;
	display: flex;
	justify-content: center;
	flexdirection: row;
	background-image: url(${background});
	background-repeat: no-repeat;
	background-size: cover;
`;

export const FlexContainer = styled.div`
	height: 100% !important;
	padding: 0 !important;
	flex-direction: "row" !important;
	margin: 0 !important;
	display: -webkit-box !important;
	display: -moz-box !important;
	display: -ms-flexbox !important;
	display: -webkit-flex !important;
	display: flex !important;
	align-items: center !important;
	justify-content: center !important;
`;

export const FlexItem = styled.div`
	padding: 5px !important;
	width: 20px !important;
	height: 20px !important;
	margin: 10px !important;
	line-height: 20px !important;
	color: white !important;
	font-weight: bold !important;
	font-size: 2em !important;
	text-align: center !important;
`;

export const CardOverlay = styled.div`
	background: #000;
	height: 415px;
	border: 1px solid;
	border-color: #fff;
	justify-content: center;
	vertical-align: middle;
	display: flex;
	align-items: center;
	background-repeat: no-repeat;
	background-size: cover;
	cursor: pointer;
	&:hover {
		background: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
			url(${(props) => (props.comics ? comics : heroes)});
		background-repeat: no-repeat;
		background-size: cover;
		transition: width 2s;
	}
`;

export const TextCentered = styled.div`text-align: center;`;
