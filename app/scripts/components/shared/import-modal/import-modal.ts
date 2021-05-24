import { useDispatch } from 'react-redux';
import { ShowAction } from '../../../redux/reducers/import-modal/import-modal.actions';
import { SettingsEntityType } from '../../../shared/settings-constants';
import { CommonModalState } from '../interfaces/common-modal.interface';

export interface ImportModalState extends CommonModalState {
  entity?: SettingsEntityType;
}

export function useImportModal() {
  const dispatch = useDispatch();

  return (state: Omit<ImportModalState, 'show'>) => dispatch({...new ShowAction(state)});
}