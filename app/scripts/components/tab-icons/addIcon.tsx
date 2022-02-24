import * as React from 'react';
import {TAB_ICON_COLOR} from '../../constant/constnat';

export const AddIcon = ({color = TAB_ICON_COLOR.default}: {
  color: string;
}) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path className="nav-svg" d="M20 11.5V8.5H11.5V0H8.5V8.5H0V11.5H8.5V20H11.5V11.5H20Z" fill={color}/>
    </svg>);
};
