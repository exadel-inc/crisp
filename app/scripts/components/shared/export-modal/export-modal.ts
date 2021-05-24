import { useDispatch } from 'react-redux';
import { ShowAction } from '../../../redux/reducers/export-modal/export-modal.actions';
import { SettingsEntityType } from '../../../shared/settings-constants';
import { CommonModalState } from '../interfaces/common-modal.interface';

export interface ExportModalState extends CommonModalState {
  entity?: SettingsEntityType;
}

export function useExportModal() {
  const dispatch = useDispatch();

  return (state: Omit<ExportModalState, 'show'>) => dispatch({...new ShowAction(state)});
}