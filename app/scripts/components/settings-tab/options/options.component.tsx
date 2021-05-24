import * as React from 'react';

import { SettingsOption } from './option.component';

export interface ISettingsOption {
  id: string;
  name: string;
  isDefault?: boolean;
};

export type OptionsProps = {
  options: ISettingsOption[]  // list of options will that will be displayed
  defaultSelection?: boolean // if true, show the radio button for changing the default option
  edit: Function;            // cb for editing the option
  duplicate: Function;       // cb for duplicating the option
  remove: Function;          // cb for removing the option
  changeDefault?: Function    // cb for changing the default option
};

export function SettingsOptions(props: OptionsProps) {
  const {
    options = [],
    defaultSelection = false,
    edit,
    duplicate,
    remove,
    changeDefault
  } = props;

  const renderOptions = (options: ISettingsOption[]) => {
    return options.map(
      (option: ISettingsOption) =>
        <SettingsOption
          key={option.id}
          optionId={option.id}
          optionName={option.name}
          isDefault={option.isDefault}
          isRadio={defaultSelection}
          onEdit={() => {edit && edit(option.id)}}
          onDuplicate={() => {duplicate && duplicate(option.id)}}
          onRemove={() => {remove && remove(option.id)}}
          onChangeDefault={() => {changeDefault && changeDefault(option.id)}}
        />
    );
  };

  return (
    <div className="row mt-1 settings-options-list">
      <div className="col">
        <ul className="list-group overflow-auto">
          { renderOptions(options) }
        </ul>
      </div>
    </div>
  );
}
