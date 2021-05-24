import * as React from 'react';
import { Page } from '../../pages/page';

/**
 * Main tab -> page elements navigation tab
 * @param isActive {boolean} is current tab active
 * @param page {Page} corresponding page
 * @param onTabNavigate {Function} function called on tab change
 */
export function PageElememntsTab ({isActive, page, onTabNavigate}: {
  isActive: boolean;
  page: Page,
  onTabNavigate: (pageId: string) => void;
}) {

  return (
    <li className="nav-item">
      <a className={`main-tab nav-link ${isActive ? ' active' : ''}`}
        data-toggle="tab"
        href={`#${page.id}`}
        onClick={() => onTabNavigate(page.id)}
      >{page.name}</a>
    </li>
  );
};