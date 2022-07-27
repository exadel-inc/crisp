'use strict';

import * as React from 'react';
import {Suspense} from 'react';
import '../styles/crisp.less';
import '../styles/crisp.scss';
import { Header } from './components/header/header';
import { ToastComponent } from './components/shared/toasts-component';
import { ConfirmModal } from './components/shared/confirm-modal/confirm-modal.component';
import { ImportModal } from './components/shared/import-modal/import-modal.component';
import { ImportTypeConfirmationModal } from './components/shared/import-type-confirmation-modal/import-type-confirmation-modal.component';
import { ExportModal } from './components/shared/export-modal/export-modal.component';
import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from './redux/store';

const AdminPages = React.lazy(() => import('./componentPages/adminPages'));
const UserPages = React.lazy(() => import('./componentPages/userPages'));

const Main = () => {
  const isAdminMode = () => useSelector((state: RootState) => state.appMode, shallowEqual) === 'ADMIN';
  const isAdminRole = () => useSelector((state: RootState) => state.currentUser.role.name, shallowEqual) === 'ADMIN';
  const getPage = () => {
    if(isAdminRole() && isAdminMode()) {
      return <Suspense fallback={null}> <AdminPages /> </Suspense>;
    }

    return <Suspense fallback={null}> <UserPages /> </Suspense>;
  };

  return (
    <main>
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
