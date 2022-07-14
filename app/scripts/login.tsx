'use strict';

import React from 'react';
import { Button } from './components/button/button';
import { InputComponent } from './components/inputComponent/inputComponent';

import { authApi } from './serverRestApi';
import store from './redux/store';
import { WriteAllDataToStorageAction } from './redux/reducers/storage/storage.actions';
import { CurrentUser } from './currentUser/currentUser';
import { UserActions } from './redux/reducers/user/user.actions';


const auth = authApi();

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

const handleSubmit = async (event: any) => {
    event.preventDefault();
    const host = event.target.elements.host.value || 'http://localhost:8080';
    localStorage.setItem('host', host);

    const data = await auth.login({
        email: event.target.elements.email.value,
        password: event.target.elements.password.value
    });

    if(data) {
        await initData(data.projectInitData);

        const userInfo = data.user;

        const currentUser = new CurrentUser(
            userInfo.id,
            userInfo.name,
            userInfo.email,
            data.accessToken,
            data.refreshToken,
            data.expiresIn,
            (userInfo.roles.length ? userInfo.roles[0] : undefined),
            host
        );

        store.dispatch({
            type:  UserActions.USER_LOGIN,
            payload: {
                data: currentUser
            }
        });

        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
};

export const Login = () => (
    <form onSubmit={handleSubmit} className="loginForm">
        <InputComponent name={'email'} />
        <InputComponent name={'password'} />
        <InputComponent name={'host'} />
        <Button type={'submit'} buttonName={'login'} action={() => {}} iconClass={''} />
    </form>
);
