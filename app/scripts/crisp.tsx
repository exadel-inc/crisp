'use strict';

import * as React from 'react';
import {Suspense} from 'react';
import '../styles/crisp.less';
import '../styles/crisp.scss';
import { Header } from './components/header/header';
import { showToast, ToastComponent } from './components/shared/toasts-component';
import { ConfirmModal } from './components/shared/confirm-modal/confirm-modal.component';
import { ImportModal } from './components/shared/import-modal/import-modal.component';
import { ImportTypeConfirmationModal } from './components/shared/import-type-confirmation-modal/import-type-confirmation-modal.component';
import { ExportModal } from './components/shared/export-modal/export-modal.component';
import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from './redux/store';
import { Button } from './components/button/button';
import { InputComponent } from './components/inputComponent/inputComponent';
import { useConfirmModal } from './components/shared/confirm-modal/confirm-modal';
import { restApi } from './serverRestApi';

const AdminPages = React.lazy(() => import('./componentPages/adminPages'));
const UserPages = React.lazy(() => import('./componentPages/userPages'));
const userService = restApi('users');

const Main = () => {
  const showConfirmModal = useConfirmModal();
  const isAdminMode = () => useSelector((state: RootState) => state.appMode, shallowEqual) === 'ADMIN';
  const isAdminRole = () => useSelector((state: RootState) => state.currentUser.role.name, shallowEqual) === 'ADMIN';
  const isAdmin = isAdminRole() && isAdminMode();
  const currentUser: any = localStorage.getItem('currentUser') || '';

  const updatePassword = () => {
    showConfirmModal({
      title: 'Update password',
      message: 'Do you want to update password?',
      isHideButtons: true,
      body: <>
        <form className='update-password-tab-form form-modal-popup' onSubmit={async (e: any) => {
          e.preventDefault();
          const elements: any = e.target?.elements || {};
          const newPassword = elements.projectName.value;
          const confirmPassword = elements.projectName.value;
          if(currentUser && currentUser._id &&  newPassword === confirmPassword) return;
          const resp = await userService.put(currentUser._id, {
            password: newPassword,
            isFirstExit: true
          });
          if(resp) {
            showToast('User successfully updated');
          } else {
            showToast('Can\'t update user in db. The application synchronizes this operation automatically');
          }
        }}>
          <InputComponent label='New password' placeholder='new password' formName={'newPassword'} name={'newPassword'} defaultValue={''} />
          <InputComponent label='Confirm Password' placeholder='confirm password'  formName={'confirmPassword'} name={'confirmPassword'} defaultValue={''} />
          <Button type={'submit'} buttonName={'Update password'} iconClass={''} action={async () => {}} />
        </form>
      </>
    });
  };

  const getPage = () => {
    if(isAdmin) {
      return <Suspense fallback={null}><AdminPages /> {currentUser && !currentUser.isFirstExit ? updatePassword() : ''} </Suspense>;
    }

    return <Suspense fallback={null}> <UserPages /> </Suspense>;
  };

  return (
    <main className={`${isAdmin ? 'admin-mode' : ''}`}>
      {
        getPage()
      }
    </main>
  );

};

export default function Crisp () {
  return <div className='app-wrapper'>
    <Header />
    <Main />
    <ToastComponent />
    <ConfirmModal />
    <ImportModal />
    <ImportTypeConfirmationModal />
    <ExportModal />
  </div>;
};
