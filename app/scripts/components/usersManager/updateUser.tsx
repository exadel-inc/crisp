import * as React from 'react';
import { useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

import { Project } from '../../project/project';

import { restApi } from '../../serverRestApi';
import { usersNavigationTabsType } from '../../redux/reducers/usersNavigation/usersNavigation.reducer';
import { UsersActionTypes } from '../../redux/reducers/users/users.actions';
import { showToast } from '../shared/toasts-component';
import { useConfirmModal } from '../shared/confirm-modal/confirm-modal';
import { UsersNavigationActions } from '../../redux/reducers/usersNavigation/usersNavigarion.actions';
import { Button } from '../button/button';
import { InputComponent } from '../inputComponent/inputComponent';
const userService = restApi('users');

const initUserProject = (userProjects: any[], projects: any[]) => projects.filter(
  project => {
    return userProjects.find(
      userProjId => {
        return userProjId === ( project.id || project._id );
      }
    );
  }
);

const initFreeProject = (userProjects: any[], projects: any[]) => projects.filter(
  project => !userProjects.find(
    userProjId => userProjId === ( project.id || project._id )
  )
);

export function UpdateUser (props: any) {
  const user = props.user;
  // get projects
  const projects = useSelector( (state: RootState) => state.storage.projects, shallowEqual) || [];

  const [userProjects, setUserProjects] = useState(initUserProject(user?.projects || [], projects));
  const [projectsFree, setProjectsFree] = useState(initFreeProject(user?.projects || [], projects));

  const [userName, setUserName] = useState(user?.username || '');
  const [userEmail, setUserEmail] = useState(user?.email || '');

  const dispatch = useDispatch();

  const showConfirmModal = useConfirmModal();

  const cancel = async () => {
    dispatch({
      type: UsersNavigationActions.USERS_LIST,
      payload: {
        tabName: usersNavigationTabsType.MAIN
      }
    });
  };

  if(!user) {
    showToast('Error. User dosn\'t exist');
    cancel();
  }

  const updateUser = async (id: string, data: any) => {
    if(id && data) {
      if(user) {
        showConfirmModal({
          title: 'Update user',
          message: `Are you sure you want to update user:  ${user.username}[${user.email}]?`,
          onConfirm: async () => {
            const resp = await userService.put(id, data);
            if(resp) {
              dispatch({
                type: UsersActionTypes.USER_UPDATED,
                payload: {
                  key: id,
                  data: resp
                }
              });

              showToast('User successfully updated');
              await cancel();
              return;
            } else {
              showToast('Can\'t update user in db. The application synchronizes this operation automatically');
            }
          },
        });
      } else {
        showToast('User does not exist');
      }
    }
  };

  const listUserProject = (index: number, id: string, label: string) => {
    return <li key={id} style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      padding: '0 10px',
      border: '1px solid gray',
      margin: '5px'
    }}>
      <span>{label}</span>
      <div id={id} data-index={index} onClick={(event) => {
        const _index = event.currentTarget.dataset.index || '-1';
        const n: number = Number(_index);

        if(n < 0) return false;

        const newProj = userProjects[n];

        setUserProjects(oldArray => oldArray.filter((item, i) => i !== n ) || []);
        setProjectsFree(oldArray => {
          return [...oldArray, newProj];
        });
        return false;
      }} style={{
        backgroundColor: 'rgba(255,255,255,0)',
        color: 'blue',
        fontSize: '2em'
      }}>-</div>
    </li>;
  };

  const listFreeProjects = (index: number, id: string, label: string) => {
    return <li key={id} style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      padding: '0 10px',
      border: '1px solid gray',
      margin: '5px'
    }}>
      <span>{label}</span>
      <div id={id} data-index={index} onClick={(event) => {
        const _index = event.currentTarget.dataset.index || '-1';
        const n: number = Number(_index);

        if(n < 0) return false;

        const newProj = projectsFree[n];

        setUserProjects(oldArray => {
          return [...oldArray, newProj];
        });
        setProjectsFree(oldArray => oldArray.filter((item, i) => i !== n ) || []);

        return false;
      }} style={{
        backgroundColor: 'rgba(255,255,255,0)',
        color: 'blue',
        fontSize: '2em'
      }}>+</div>
    </li>;
  };

  return (
    <div className='update-user'
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
        height: '100%'
      }}>
      <div style={{
        width: '100%',
        border: '1px solid gray',
        padding: '10px',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
      }}>
        <div style={{
          flex: 1,
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
          alignItems: 'flex-start',
          marginBottom: '20px'
        }}>
          <InputComponent formName={'username'} name={'username'} label={'User Name:'} value={userName} placeholder={'user name'} changeAction={(event: any) => setUserName(event.target.value)} />
        </div>
        <div style={{
          flex: 1,
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
          alignItems: 'flex-start',
          marginBottom: '20px'
        }}>
          <InputComponent formName={'email'} name={'email'} label={'Email:'} value={userEmail} placeholder={'user email'} changeAction={(event: any) => setUserEmail(event.target.value)} />
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          flex: 10,
          width: '100%'
        }}>
          <div style={{
            width: '50%',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div>
              <span>Current User Projects:</span>
            </div>
            <ul style={{
              flex: 11,
              border: 'solid 1px gray',
              overflowY: 'auto',
              listStyle: 'none',
              padding: '0',
              margin: '0',
              display: 'flex',
              flexDirection: 'column'
            }}>
              {
                userProjects.map((proj, i) => {
                  return listUserProject(i, proj.id || proj._id, proj.name);
                })
              }
            </ul>
          </div>
          <div style={{
            width: '50%',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div>
              <span>Available Projects:</span>
            </div>
            <ul style={{
              flex: 11,
              border: 'solid 1px gray',
              overflowY: 'auto',
              listStyle: 'none',
              padding: '0',
              margin: '0',
              display: 'flex',
              flexDirection: 'column'
            }}>
              {
                projectsFree.map((proj, i) => {
                  return listFreeProjects(i, proj.id || proj._id, proj.name);
                })
              }
            </ul>
          </div>
        </div>
      </div>
      <div style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row'
      }}>
        <Button buttonName={'Update'} action={() => {
          updateUser(
            (user.id || user._id), {
              'username': userName,
              'email': userEmail,
              'currentHashedRefreshToken': user.currentHashedRefreshToken,
              'projects': userProjects.map(p => p.id || p._id || p) || [],
              'grants': []
            });
        }} iconClass={''} />
        <Button buttonName={'Cancel'} action={() => cancel()} iconClass={''} />
      </div>
    </div>
  );
};


