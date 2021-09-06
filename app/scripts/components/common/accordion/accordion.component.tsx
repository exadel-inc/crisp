import React from 'react';

interface IAccordion {
  title?: string;
  isInitExpanded?: boolean;
  children?: any[];
  onChange?: ( state: IAccordionState ) => any;
  onExpand?: ( state: IAccordionState ) => any;
  onClose?: ( state: IAccordionState ) => any;
}

interface IAccordionState {
  event: React.MouseEvent<HTMLElement>;
  title?: string;
  isInitExpanded?: boolean;
  children?: any[];
}

/**
 * Accordion
 */
export function Accordion (props: IAccordion) {
  const {
    title = 'Title',
    isInitExpanded = true,
    children = [],
    onChange = null,
    onExpand = null,
    onClose = null
  } = props;

  const [__isExpanded, setIsExpanded] = React.useState(isInitExpanded);

  const classString = __isExpanded ? 'accordion accordion__expanded':  'accordion';


  // if isExpanded attribute is true, return Extended svg icon, otherwise return svg Close icon
  const getSvg = function(isExpanded: boolean) {
    if(isExpanded) {
      return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#6563ff" d="M17,13.41,12.71,9.17a1,1,0,0,0-1.42,0L7.05,13.41a1,1,0,0,0,0,1.42,1,1,0,0,0,1.41,0L12,11.29l3.54,3.54a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29A1,1,0,0,0,17,13.41Z"/></svg>;
    }

    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#6563ff" d="M17,9.17a1,1,0,0,0-1.41,0L12,12.71,8.46,9.17a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42l4.24,4.24a1,1,0,0,0,1.42,0L17,10.59A1,1,0,0,0,17,9.17Z"/></svg>;
  };

  // call the "onChange" function when the accordion is clicked
  const handleChange = (event: React.MouseEvent<HTMLElement>, isInitExpanded: boolean) => {
    setIsExpanded(isInitExpanded);
    onChange && onChange({ event, title, isInitExpanded, children });
  };

  // call the "onExpand" or the "onClose" function when the "Expand/Close" icon is clicked
  const handleExpandClose = (event: React.MouseEvent<HTMLElement>, isInitExpanded: boolean) => {
    const func = isInitExpanded ? onExpand : onClose;

    if (func) {
      func({  event, title, isInitExpanded, children });
    }
  };

  return (
    <div className={classString}>
      <div className="accordion__header"
        onClick={
          (event) => {
            handleChange(event, !__isExpanded);
            handleExpandClose(event, __isExpanded);
          }
        }
      >
        <div className="accordion__title">{ title }</div>
        <div className="accordion__icon">{ getSvg(__isExpanded) }</div>
      </div>
      <div className="accordion__container">
        <div className="accordion__item__wrapper">{
          children?.map((child, index) => {
            // class item_order_${index} lets you update styles for child components
            return <div className={`accordion__item item_order__${index}`} key={index.toString()}>{child}</div>;
          })
        }</div>
      </div>
    </div>
  );
};
