import React from 'react';
import {NavigationTabType} from '../header/navigationTypes';

export const CommonTabLogic = ({handleTabClick, children, isActive, activeTab, titleStr = ''}: {
  handleTabClick: any;
  children: any;
  isActive: any;
  activeTab: NavigationTabType;
  titleStr: string;
}) => {
  const activeClass = isActive(activeTab) ? 'active': '';
  const classStr = `nav-link crisp-tab p-2 ${activeClass}`;
  return (
    <li className="nav-item text-primary">
      <a title={titleStr} className={classStr} data-toggle="pill" data-tab-name="batch" onClick={() => handleTabClick(activeTab)}>
        {children}
      </a>
    </li>
  );
};
