import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux'
import { CrispElement } from '../../elements/element';
import { Page } from '../../pages/page';
import { RootState } from '../../redux/store';
import { elementsService, pagesService, projectsService } from '../../shared/services';
import { NavigationTabType } from '../header/navigation-tabs';
import { MainTabFooter } from './main-tab-footer';
import { PageElememntsTab } from './page-elements-tab.component';
import { PageElememntsTable } from './page-elements-table.component';

/**
 * Main tab
 */
export function MainTab () {

  /**
   * Is current tab active
  */
  const isActive = useSelector((state: RootState) => state.navigation.tab) === NavigationTabType.MAIN;

  /**
   * Pages of current project from storage
   */
  const pages: Page[] = useSelector(() => pagesService.getMany(projectsService.currentProject?.id));

  /**
   * Component state: current page
   */
  const [currentPage, setCurrentPage] = useState(pages[0]?.id);

  /**
   * Component state: elements that are been used to generate script
   */
  const [elementsForScript, setElementsForScript] = useState({elements: [] as CrispElement[], useSeparationLines: false});

  /**
   * Component state: additional elements for script
   */
  const [addElementForScript, setAddElementForScript]: [
    {element: CrispElement | null},
    React.Dispatch<React.SetStateAction<{element: CrispElement | null}>>
  ] = useState({element: null});

  /**
   * Adds element to the elementsForScript list
   * @param element {CrispElement} element that will be added
   */
  const handleAddElement = (element: CrispElement) => {
    setAddElementForScript({element});
  }

  /**
   * Adds elements to the setElementsForScript list
   * @param currentPageOnly {boolean} get elements of current page al of all pages of current project
   */
  const handleGenerateScript = (currentPageOnly: boolean) => {
    const pageIds = pages.map(pg => pg.id);
    const elements = elementsService.getMany()
      .filter(el => currentPageOnly ? el.page === currentPage : pageIds.includes(el.page))
      .sort((el1, el2) => pageIds.indexOf(el1.page) - pageIds.indexOf(el2.page))
    setElementsForScript({elements, useSeparationLines: true});
  }

  return isActive ? (
    <div className={`tab-pane fade show ${isActive ? 'active' : ''}`} id="main">
      <header>
        <ul id="main-page-tabs-nav" className="nav nav-tabs">
          {pages.map((page: Page) =>
            <PageElememntsTab
              key={`nav-tab-${page.id}`}
              isActive={currentPage === page.id}
              page={page}
              onTabNavigate={(pageId: string) => setCurrentPage(pageId)}
            />
          )}
        </ul>
      </header>

      <div id="main-page-tabs" className="tab-content mt-3">
        {pages.map((page: Page) =>
          <PageElememntsTable
            key={`table-${page.id}`}
            isActive={currentPage === page.id}
            page={page}
            onAddElement={handleAddElement}
          />
        )}
      </div>

      <MainTabFooter
        elementsData={elementsForScript}
        addElement={addElementForScript}
        onClear={() => setElementsForScript({elements: [], useSeparationLines: false})}
        onGenerate={handleGenerateScript}
      />

    </div>
  ) : null;
};