import React from 'react';
import Button from 'material-ui/Button';
import moment from 'moment';
import DescriptionIcon from 'material-ui-icons/Description';
import DateRangeIcon from 'material-ui-icons/DateRange';
import Grid from 'material-ui/Grid';
import { Typography } from 'material-ui';

const getPublishedDate = (dates) => {
	const date = dates.find((date) => date.type === 'focDate').date;

	return date ? moment(date).format('MMM Do YY') : null;
};

const ContainerWithImage = (props) => {
	return (
		<Grid container style={{ padding: 20 }} xs={12} sm={12} spacing={8}>
			<Grid
				xs={12}
				sm={6}
				style={{
					textAlign: 'right',
					padding: 20
				}}
			>
				<img
					style={styles.image}
					alt={props.title}
					src={`${props.thumbnail.path}/portrait_uncanny.${props.thumbnail.extension}`}
				/>
			</Grid>
			<Grid
				item
				xs={12}
				sm={5}
				style={{
					textAlign: 'left',
					padding: 20
				}}
			>
				<Typography style={styles.title} variant="display1">
					{props.title}
				</Typography>
				<div className={props.classes.info}>
					<span className={`${props.classes.infoCard} ${props.classes.infoCardCode}`}>
						{props.diamondCode}
					</span>
					{props.pageCount && (
						<span className={props.classes.infoCard}>
							<DescriptionIcon className={props.classes.infoCardIcon} />
							{props.pageCount ? `${props.pageCount} Páginas` : `Não existem dados`}
						</span>
					)}
					{props.date ? (
						<span className={props.classes.infoCard}>
							<DateRangeIcon className={props.classes.infoCardIcon} />
							Publicado em: {getPublishedDate(props.dates)}
						</span>
					) : null}
				</div>
				{props.prices &&
					props.prices.map((x) => {
						return (
							<div>
								<Typography variant="body1" style={styles.price} gutterBottom>
									$ {x.price || 'Não existe preço especificado.'}
								</Typography>
							</div>
						);
					})}
				<Typography style={styles.description} variant="body1">
					DESCRIÇÃO
				</Typography>
				<Typography variant="body1" style={styles.descItem} gutterBottom>
					{props.description || 'Nenhuma descrição para mostrar.'}
				</Typography>
				{props.urls.map(({ type, url }) => {
					var types = {
						detail: {
							label: 'Detalhes',
							url
						},
						purchase: {
							label: 'Comprar',
							url
						},
						wiki: {
							label: 'Mais',
							url
						},
						comiclink: {
							label: 'Comic Link',
							url
						}
					};
					return (
						<Button
							key={url}
							href={url}
							target={'_blank'}
							raised={true}
							dense={true}
							style={{ color: '#fff' }}
						>
							{types[type] && types[type].label}
						</Button>
					);
				})}
			</Grid>
		</Grid>
	);
};

const styles = {
	description: {
		fontSize: 22,
		paddingTop: 10,
		color: '#fff',
		fontFamily: 'BentonSansCompBlackRegular'
	},
	title: {
		fontSize: 40,
		color: '#fff',
		fontFamily: 'BentonSansCompBlackRegular'
	},
	descItem: {
		color: '#fff'
	},
	image: {
		border: '4px solid',
		borderColor: '#fff'
	},
	price: {
		color: '#fff',
		fontFamily: 'BentonSansCompBlackRegular',
		fontSize: 20,
		paddingTop: 10
	}
};

export default ContainerWithImage;
