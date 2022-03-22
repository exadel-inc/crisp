import React, {createContext, useState} from 'react';
import {ProjectPanel} from '../projectPanel/projectPanel';
import {PillList} from '../pillList/pillList';
import {AddPageButton} from '../addPageButton/addPageButton';

export const IsOpenProject = createContext({
  isOpen: false, changeState: () => {}});
const {Provider} = IsOpenProject;

export const ProjectComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const changeState = () => {
    setIsOpen(prevState => !prevState);
  };

  return (
    <Provider value={{isOpen, changeState}}>
      <ProjectPanel counter='2' projectName='adscd'/>
      {isOpen &&
        <><PillList/>
          <AddPageButton/></>
      }
    </Provider>
  );
};
