import React, {useState} from 'react';

export const Checkbox = ({count = 10}) => {
  const [checked, setChecked] = useState(false);

  return (
    <div className='checkBoxWrapper' onClick={() => setChecked(prevState => !prevState)}>
      Select all {count}
      {checked ?
        <div className='checkboxSquare checked'>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.01493 9.49254L1.25373 5.73134L0 6.98507L5.01493 12L15.7612 1.25373L14.5075 0L5.01493 9.49254Z"
                  fill="#0093FE"/>
          </svg>
        </div>
        : <div className='checkboxSquare'></div>
      }
    </div>
  );
};
