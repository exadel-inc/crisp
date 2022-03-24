import React, {createContext, useState} from 'react';
import {ProjectPanel} from '../projectPanel/projectPanel';
import {PillList} from '../pillList/pillList';
import {AddPageButton} from '../addPageButton/addPageButton';

export const IsOpenProject = createContext({
  isOpen: false, changeState: () => {
  }
});
const {Provider} = IsOpenProject;

export const ProjectComponent = ({projectName, counter}: { projectName: string; counter: string | number }) => {
  const [isOpen, setIsOpen] = useState(false);

  const changeState = () => {
    setIsOpen(prevState => !prevState);
  };

  return (
    <Provider value={{isOpen, changeState}}>
      <ProjectPanel counter={counter} projectName={projectName}/>
      {isOpen &&
        <><PillList/>
          <AddPageButton/></>
      }
    </Provider>
  );
};
