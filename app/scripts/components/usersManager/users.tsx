import * as React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { CreateUser } from './addUser';
import { UpdateUser } from './updateUser';
import { restApi } from '../../serverRestApi';
import { EditComponent } from '../editComponent/editComponent';
import { DeleteComponent } from '../deletComponent/deleteComponent';
import { UsersNavigationState, usersNavigationTabsType } from '../../redux/reducers/usersNavigation/usersNavigation.reducer';
import { UsersActionTypes } from '../../redux/reducers/users/users.actions';
import { showToast } from '../shared/toasts-component';
import { useConfirmModal } from '../shared/confirm-modal/confirm-modal';
import { UsersNavigationActions } from '../../redux/reducers/usersNavigation/usersNavigarion.actions';
import { Button } from '../button/button';

const userService = restApi('users');

export function Users () {
  const currentTab: UsersNavigationState = useSelector((state: RootState) => state?.usersNavigation, shallowEqual);
  const users = useSelector((state: any) => {
    return state?.users;
  }, shallowEqual);
  const dispatch = useDispatch();

  const showConfirmModal = useConfirmModal();

  const tabClickHandler = (type: any, payload?: any) => {
    dispatch({
      type: type,
      payload: payload
    });
  };

  const removeUser = async (user: any) => {
    if(user) {
      showConfirmModal({
        title: 'Delete confirmation',
        message: `Do you want to delete:\s\s${user.username}[${user.email}]?`,
        onConfirm: async () => {
          const id = user.id || user._id;
          const resp = await userService.del(id);
          if(resp) {
            tabClickHandler(UsersActionTypes.USER_REMOVED, {
              key: id,
              data: resp
            });
            showToast('User has been removed');
          } else {
            showToast('Can\'t remove user from db. The application synchronizes this operation automatically');
          }
        }
      });
    } else {
      showToast('User does not exist');
    }
  };

  const UserTab = () => {
    switch (currentTab.tab) {
      case usersNavigationTabsType.CREATE:
        return <CreateUser/>;

      case usersNavigationTabsType.UPDATE:
        return <UpdateUser user={{...currentTab.selectedUser}} />;

      default:
        return <>
          <div className='user-list'>
            <div>
              <ul style={{
                display: 'flex',
                flexDirection: 'column',
                border: '1px gray solid',
                margin: 0,
                padding: '5px',
                height: '77%',
                overflowY: 'auto'
              }}>
                {
                  users.map((user: any, index: number) => {
                    const id = user ? user.id || user['_id'] : '';

                    return <li key={`${index}_user_item_${id}`} style={{
                      flexGrow: '1',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      backgroundColor: 'rgba(0,0,0,0.1)',
                      padding: '5px',
                      margin: '5px',
                      maxHeight: '50px'
                    }}>
                      <div style={{
                        flex: 0.1
                      }}>
                        <svg width='3em' height='3em' version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' viewBox='0 0 512 512'>
                          <rect x='33.854' y='388.137' style={{
                            'fill': '#CEE8FA'
                          }} width='444.293' height='107.352'/>
                          <path style={{
                            'fill' : '#2D527C'
                          }} d='M478.146,327.617c9.122,0,16.516-7.394,16.516-16.516V16.516C494.663,7.394,487.268,0,478.146,0
                        H33.854c-9.122,0-16.516,7.394-16.516,16.516v371.615v30.356v76.996c0,9.122,7.394,16.516,16.516,16.516h444.292
                        c9.122,0,16.516-7.394,16.516-16.516V388.132c0-9.122-7.394-16.516-16.516-16.516H374.089v-62.929
                        c0-36.848-22.406-68.553-54.306-82.229c17.303-16.718,28.094-40.133,28.094-66.036c0-50.661-41.217-91.876-91.876-91.876
                        s-91.878,41.217-91.878,91.878c0,50.651,41.2,91.86,91.846,91.876c0.01,0,0.021,0.002,0.031,0.002h28.669
                        c31.092,0,56.387,25.295,56.387,56.387v62.929H170.944v-62.929c0-9.122-7.394-16.516-16.516-16.516s-16.516,7.394-16.516,16.516
                        v62.929H50.37V33.033h411.26v278.068C461.63,320.223,469.024,327.617,478.146,327.617z M197.157,160.423
                        c0-32.447,26.397-58.843,58.843-58.843s58.843,26.397,58.843,58.843S288.447,219.266,256,219.266S197.157,192.869,197.157,160.423z
                          M461.63,404.648v74.319H50.37v-60.48v-13.839H461.63z'/><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>
                        </svg>
                      </div>
                      <div style={{
                        flex: 1
                      }}>
                        <div>{user.name}</div>
                        <div>{user.email}</div>
                      </div>
                      <div style={{
                        flex: 0.1,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                      }}>
                        <EditComponent clickAction={
                          () => {
                            tabClickHandler(UsersNavigationActions.UPDATE_USER, {
                              tabName: usersNavigationTabsType.UPDATE,
                              selectedUser: user
                            });
                          }
                        } />
                        <DeleteComponent clickAction={() => removeUser(user)} />
                      </div>
                    </li>;
                  })
                }
              </ul>
            </div>
            <div>
              <Button buttonName={'Create User'} action={() => tabClickHandler(UsersNavigationActions.CREATE_USER, {
                tabName: usersNavigationTabsType.CREATE
              })} iconClass={''} />
            </div>
          </div>
        </>;
    }
  };

  return (<UserTab />);
};

