//flow

import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from 'material-ui/styles';
import { theme } from './util/theme';
import Layout from './Layout';
import getStore from './store/store';
import Router from './router/router';
import HomeScreen from './screens/HomeScreen';
const store = getStore();

const App = () => {
	return (
		<Provider store={store}>
			<MuiThemeProvider theme={theme}>
				<Layout />
				<Router />
			</MuiThemeProvider>
		</Provider>
	);
};

export default App;
