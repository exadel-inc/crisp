'use strict';

import React, { FormEvent } from 'react';
import { Button } from './components/button/button';
import { InputComponent } from './components/inputComponent/inputComponent';

import { authApi, restApi } from './serverRestApi';
import store from './redux/store';
import { WriteAllDataToStorageAction } from './redux/reducers/storage/storage.actions';
import { CurrentUser } from './currentUser/currentUser';
import { UserActions } from './redux/reducers/user/user.actions';
import { Spinner } from './components/spinner/spinner';
import { InitUsersToStorageAction } from './redux/reducers/users/users.actions';


const auth = authApi();
const userService = restApi('users');

const setData = (key: string, itemData: any) => {
    localStorage.setItem(key, JSON.stringify(itemData) );
};

const initData = async (data: any) => {
    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            setData(key, data[key]);
        }
    };

    store.dispatch({...new WriteAllDataToStorageAction(data)});
};

// http://localhost:8080
const handleSubmit = async (email: string, password: string, host: string) => {
    localStorage.setItem('host', host);

    const data = await auth.login({
        email: email,
        password: password
    });

    if(data) {
        const userInfo = data.user;
        const userRole = userInfo.roles.length ? userInfo.roles[0] : undefined;

        await initData(data.projectInitData);

        const currentUser = new CurrentUser(
            userInfo.id,
            userInfo.name,
            userInfo.email,
            data.accessToken,
            data.refreshToken,
            data.expiresIn,
            userRole,
            host
        );

        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('currentUser', JSON.stringify(currentUser));

        if(userRole && userRole.name === 'ADMIN') {
            const users = await userService.getAll();
            if(users) {
                store.dispatch({...new InitUsersToStorageAction({
                    data: users
                })});
            }
        }

        store.dispatch({
            type:  UserActions.USER_LOGIN,
            payload: {
                data: currentUser
            }
        });
    }
};

export const Login = () => (
    <div className='login-wrapper'>
        <form onSubmit={async (e: any) => {
            e.preventDefault();
            const spinner = document.getElementById('loadingBox');
            try {
                spinner?.classList.remove('hide');
                const elements: any = e.target?.elements || {};
                const email = elements.email.value;
                const password = elements.password.value;
                const host = elements.host.value;
                await handleSubmit(email, password, host);
            } catch(err) {

            } finally {
                spinner?.classList.add('hide');
            }
        }} className="loginForm">
            <InputComponent name={'email'} />
            <InputComponent name={'password'} />
            <InputComponent name={'host'} />
            <Button type={'submit'} buttonName={'login'} action={() => { } } iconClass={''} />
        </form>
        <div id='loadingBox' className='hide'>
            <Spinner />
        </div>
    </div>
);
