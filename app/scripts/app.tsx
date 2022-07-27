'use strict';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import '../styles/crisp.less';
import '../styles/crisp.scss';

import { Login } from './login';
import { Suspense } from 'react';
import { Provider, shallowEqual, useSelector } from 'react-redux';
import store, { RootState } from './redux/store';

const Crisp = React.lazy(() => import('./crisp'));

const Crisp_App = () => {
    const isLogined = useSelector((state: RootState) => state.currentUser?.token, shallowEqual);

    return (<>
        { 
            isLogined ? 
            <Suspense fallback={null}> <Crisp /> </Suspense> :
            <Login /> 
        }
        </>);
};

function App () {
    return (
        <Provider store={store}>
            <Crisp_App />
        </Provider>
    );
}

ReactDOM.render(<App />, document.getElementById('crisp'));
