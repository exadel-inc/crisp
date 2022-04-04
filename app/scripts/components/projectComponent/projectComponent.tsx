import React, {createContext, useState} from 'react';
import {ProjectPanel} from '../projectPanel/projectPanel';
import {PillList} from '../pillList/pillList';
import {AddPageButton} from '../addPageButton/addPageButton';
import {PageTableHeader} from '../pageTableHeader/pageTableHeader';
import {TableElement} from '../tableElement/tableElement';

export const IsOpenProject = createContext({
  isOpen: false, changeState: () => {
  }
});
const {Provider} = IsOpenProject;

export const ProjectComponent = ({projectName, counter}: { projectName: string; counter: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  const changeState = () => {
    setIsOpen(prevState => !prevState);
  };

  return (
    <Provider value={{isOpen, changeState}}>
      <ProjectPanel counter={counter} projectName={projectName}/>
      {isOpen &&
        <><PillList/>
          <AddPageButton/>
          <PageTableHeader/>
          <TableElement/>
        </>
      }
    </Provider>
  );
};
