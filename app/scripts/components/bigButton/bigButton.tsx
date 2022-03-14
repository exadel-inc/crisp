import * as React from 'react';

export const BigButton = ({buttonName, disable = true,}: { buttonName: string; disable: boolean }) => {
  return (
    <button className={!disable ? 'disabled' : ''} disabled={!disable}>
      {buttonName}
    </button>
  );
};
