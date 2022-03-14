import React from 'react';
import {NavigationTabType} from '../header/navigation-tabs';

export const CommonTabLogic = ({handleTabClick, children, isActive, activeTab}: {
  handleTabClick: any;
  children: any;
  isActive: any;
  activeTab: NavigationTabType;
}) => {
  return (
    <li className="nav-item text-primary">
      <a className={`nav-link crisp-tab p-2 ${isActive(activeTab) && 'active'}`} data-toggle="pill" data-tab-name="batch" onClick={() => handleTabClick(activeTab)}>
        {children}
      </a>
    </li>
  );
};
