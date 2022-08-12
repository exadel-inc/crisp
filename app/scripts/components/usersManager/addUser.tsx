import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { UsersActionTypes } from '../../redux/reducers/users/users.actions';
import { UsersNavigationActions } from '../../redux/reducers/usersNavigation/usersNavigarion.actions';
import { usersNavigationTabsType } from '../../redux/reducers/usersNavigation/usersNavigation.reducer';

import { restApi } from '../../serverRestApi';
import { Button } from '../button/button';
import { Checkbox } from '../checkbox/checkbox';
import { InputComponent } from '../inputComponent/inputComponent';
import { showToast } from '../shared/toasts-component';

const userService = restApi('users');

export function CreateUser () {
    debugger;
    const dispatch = useDispatch();

    const createUser = async (data: any) => {
        if(data) {
          const resp = await userService.post(data); 
          if(resp) {
              dispatch({
                  type: UsersActionTypes.USER_CREATED,
                  payload: {
                      data: resp
                  }
              });
              showToast('User successfully created');
              await cancel();
              return;
          }

          showToast('Can\'t create user in db. The application synchronizes this operation automatically');
        } else {
          showToast('Please, fill in all fields');
        }
    };

    const cancel = async () => {
        dispatch({
            type: UsersNavigationActions.USERS_LIST,
            payload: {
              tabName: usersNavigationTabsType.MAIN
            }
        });
    };

    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [isAdmineRole, setIsAdminRole] = useState(false);

    return (
        <div className='add-user'
            style={{
            justifyContent: "flex-start",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
            height: "100%"
        }}>
            <div style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
            }}>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: "20px"
                }}>
                    <InputComponent formName={'username'} name={'username'} label={'User Name:'} value={userName} placeholder={'Enter user name'} changeAction={(event:any) => setUserName(event.target.value)} />
                </div>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: "20px"
                }}>
                    <InputComponent formName={'email'} name={'email'} label={'Email:'} value={userEmail} placeholder={'Enter user email'} changeAction={(event:any) => setUserEmail(event.target.value)} />
                </div>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: "20px"
                }}>
                    <InputComponent formName={'password'} name={'password'} label={'Password:'} value={userPassword} placeholder={'Enter user password'} changeAction={(event:any) => setUserPassword(event.target.value)} />
                </div>
                <div style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: "20px"
                }}>
                    <label className='' style={{margin: 0}}>Is Admin: </label>
                    <Checkbox count={0} checkedValue={isAdmineRole} clickHandler={(event: any, data: any) => setIsAdminRole(!isAdmineRole)} />
                </div>
                <div style={{
                        width: "100%",
                        display: "flex"
                }}>
                    <Button buttonName={'Create'} action={() => createUser({
                        "username": userName,
                        "email": userEmail,
                        "password": userPassword,
                        "roles": [
                            (isAdmineRole ? "62c863d4bc85c78fc0a6ff06" : "62c863d4bc85c78fc0a6ff05")
                        ],
                        "date": "2022-07-29T14:11:35.118Z"
                    })} iconClass={''} />
                    <Button buttonName={'Cancel'} action={() => cancel()} iconClass={''} />
                </div>
            </div>
        </div>
    );
};