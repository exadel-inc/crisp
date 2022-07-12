'use strict';

import * as React from 'react';

import '../styles/crisp.less';
import '../styles/crisp.scss';
import { BatchGenerateTab } from './components/batch-generate/batch-generate.component';
import { Header } from './components/header/header';
import { InspectorTab } from './components/inspector-tab/inspector-tab.component';
import { MainTab } from './components/main-tab/main-tab.component';
import { SettingsTab } from './components/settings-tab/settings-tab.component';
import { ToastComponent } from './components/shared/toasts-component';
import { ConfirmModal } from './components/shared/confirm-modal/confirm-modal.component';
import { ImportModal } from './components/shared/import-modal/import-modal.component';
import { ImportTypeConfirmationModal } from './components/shared/import-type-confirmation-modal/import-type-confirmation-modal.component';
import { ExportModal } from './components/shared/export-modal/export-modal.component';

const MainNavigation = () => <div className="tab-content">
  <MainTab/>
  <BatchGenerateTab/>
  <InspectorTab/>
  <SettingsTab/>
</div>;

const Main = () => <main>
  <MainNavigation/>
</main>;

export default function Crisp () {
  return <><Header /><Main /><ToastComponent /><ConfirmModal /><ImportModal /><ImportTypeConfirmationModal /><ExportModal /></>;
};
