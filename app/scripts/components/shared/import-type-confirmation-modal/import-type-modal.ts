import { useDispatch } from 'react-redux';
import { ShowAction } from '../../../redux/reducers/import-type-modal/import-type-modal.actions';
import { CommonModalState } from '../interfaces/common-modal.interface';

export interface ImportTypeModalState extends CommonModalState {
  onMerge?: () => void;
  onOverride?: () => void;
}

export function useImportTypeModal() {
  const dispatch = useDispatch();

  return (state: Omit<ImportTypeModalState, 'show'>) => dispatch({...new ShowAction(state)});
}