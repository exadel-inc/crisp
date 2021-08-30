import * as React from 'react';

interface IChip {
  value: any;
  text: string;
  active?: boolean;
  maxLength?: number;
  onChange?: ( state: IChipState ) => any;
  onDelete?: ( state: IChipState ) => any;
}

interface IChipState {
  text: string;
  value: any;
  active: boolean;
}

/**
 * Chip component
 * @param props { IChip } - component properties
 * @returns 
 */
export function Chip (props: IChip) {
  const {
    value = null,
    text = '',
    maxLength = 15,
    active = false,
    onChange = null,
    onDelete = null
  } = props;

  const chipClassList = ['chip'];

  // add a class for applying CSS styles when the chip is active
  if (active) {
    chipClassList.push('chip_state_active');
  }

  // trim the "text" if its length is greater than "maxLength"
  const chipText = text.length > maxLength ? text.slice(0, maxLength) + '..' : text;

  // call the "onChange" function when the chip is clicked
  // skip clicks on chip buttons
  const handleChange = (event: React.MouseEvent<HTMLElement>) => {
    if ( !isButtonElement(event.target as HTMLElement) ) {
      onChange && onChange({ text, value, active });
    }
  };

  // call the "onDelete" function when the "delete" button is clicked
  const handleDelete = () => {
    onDelete && onDelete({ text, value, active });
  };

  return (
    <div
      className={ chipClassList.join(' ') }
      title={ text }
      onClick={ (event) => {
        handleChange(event);
      } }
    >
      <div className="chip__content">
        <span className="chip__icon chip__icon_name_drag"></span>
        <div className="chip__text">{ chipText }</div>
        <span className="chip__icon chip__icon_name_active"></span>
        <span
          className="chip__button chip__button_action_delete"
          onClick={ (event) => {
            handleDelete();
          } }
        ></span>
      </div>
    </div>
  );
};

/**
 * Returns true, if the element is [inside] the chip button element
 * @param element { HTMLElement } - an
 * @returns boolean;
 */
function isButtonElement (element: HTMLElement): boolean {
  return element && !!element.closest('.chip__button');
}
