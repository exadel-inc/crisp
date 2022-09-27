import * as React from 'react';
import './textComponent.scss';

export const TextComponent = ({value = '', label = '', disabled = false, defaultValue = '', formName = ''}) => {
  return (
    <><div className='textComponent'>
        <div className='textarea-label'>{label}</div>
        <textarea disabled={disabled} name={formName} defaultValue={(value || defaultValue)} />
      </div>
    </>
  );
};
