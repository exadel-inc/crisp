import * as React from 'react';

export const BigButton = ({buttonName, disable = true, onClick = (e: any) => {}}: { buttonName: string; disable: boolean; onClick: Function }) => {
  return (
    <button className={!disable ? 'disabled' : ''} disabled={!disable} onClick={(e) => { onClick(e); }}>
      {buttonName}
    </button>
  );
};
