import React, {createContext, useEffect, useState} from 'react';
import {ProjectPanel} from '../projectPanel/projectPanel';
import {PillList} from '../pillList/pillList';
import {AddPageButton} from '../addPageButton/addPageButton';
import {PageTableHeader} from '../pageTableHeader/pageTableHeader';
import {useDispatch, useSelector} from 'react-redux';
import {TabElementsList} from '../tabElementsList/tabElementsList';
import {clearSelectedPageId} from '../../redux/reducers/selectedPage/selectedPage.actionCreator';
import {
  clearSelectedProjectId,
  setSelectedProjectId
} from '../../redux/reducers/selectedProject/selectedProject.actionCreator';

export const IsOpenProject = createContext({
  isOpen: false, changeState: () => {
  }
});
const {Provider} = IsOpenProject;

export const ProjectComponent = ({name, counter, projectId}: { name: string; counter: number; projectId: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  // @ts-ignore
  const {selectedPageId, selectedProjectId} = useSelector(state => state);
  const dispatch = useDispatch();

  const changeState = () => {
    if (!selectedProjectId) {
      dispatch(setSelectedProjectId(projectId));
    } else if (selectedProjectId !== projectId) {
      dispatch(clearSelectedProjectId());
      dispatch(clearSelectedPageId());
      dispatch(setSelectedProjectId(projectId));
    } else {
      dispatch(clearSelectedProjectId());
      dispatch(clearSelectedPageId());
    }
  };

  useEffect(() => {
    if (selectedProjectId && selectedProjectId === projectId) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [selectedProjectId]);

  return (
    <Provider value={{isOpen, changeState}}>
      <ProjectPanel counter={counter} projectName={name}/>
      {selectedProjectId === projectId &&
        <>
          <PillList projectId={projectId}/>
          <AddPageButton/>
          {selectedPageId &&
            <>
              <PageTableHeader/>
              <TabElementsList selectedPageId={selectedPageId}/>
            </>
          }
        </>
      }
    </Provider>
  );
};
