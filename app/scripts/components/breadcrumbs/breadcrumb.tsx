import * as React from 'react';
import './breadcrumb.scss';
import {COUNT_PROJECT_TITLE} from '../../constants/constants';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {clearSelectedProjectId} from '../../redux/reducers/selectedProject/selectedProject.actionCreator';
import {clearSelectedPageId} from '../../redux/reducers/selectedPage/selectedPage.actionCreator';

export const Breadcrumb = () => {
  // @ts-ignore
  const projects = JSON.parse(localStorage.getItem('projects'));
  // @ts-ignore
  const pages = JSON.parse(localStorage.getItem('pages'));
  const projectLength = projects.length;
  const [projectName, setProjectName] = useState('Empty');
  const [pageName, setPageName] = useState('Empty');

  // @ts-ignore
  const {selectedPageId, selectedProjectId} = useSelector(state => state);
  const dispatch = useDispatch();

  const getTitle = () => {
    return projectLength > 1 ? `${COUNT_PROJECT_TITLE}s` : `${COUNT_PROJECT_TITLE}`;
  };

  useEffect(() => {
    if (selectedProjectId) {
      setProjectName(projects.find((el: any) => el._id === selectedProjectId).name);
    }
  }, [selectedProjectId]);

  useEffect(() => {
    if (selectedPageId) {
      setPageName(pages.find((el: any) => el._id === selectedPageId).name);
    }
  }, [selectedPageId]);

  return (
    <nav className='breadcrumbs'>
      <ol>
        <li>
          <span>{projectLength}</span>
          <button className='breadcrumbButton'
                  onClick={() => {
                    dispatch(clearSelectedProjectId());
                    dispatch(clearSelectedPageId());
                  }
                  }
          >
            <b>{getTitle()}</b></button>
          {selectedProjectId && <span> {' >'}</span>}
        </li>
        {selectedProjectId &&
          <li>
            <button
              className={`breadcrumbButton ${!selectedPageId && 'breadcrumbLast'}`}
              disabled={!selectedPageId}
              onClick={() => {
                dispatch(clearSelectedPageId());
              }
              }
            >
              {projectName}
            </button>
            {selectedPageId && <span> {' >'}</span>}
          </li>}
        {selectedPageId &&
          <li>
            <button
              className='breadcrumbButton breadcrumbLast'
              disabled
            >
              {pageName}
            </button>
          </li>
        }
      </ol>
    </nav>
  );
};
