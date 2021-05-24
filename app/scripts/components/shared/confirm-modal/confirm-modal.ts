import { useDispatch } from 'react-redux';
import { ShowAction } from '../../../redux/reducers/confirm-modal/confirm-modal.actions';
import { CommonModalState } from '../interfaces/common-modal.interface';

export interface ConfirmModalState extends CommonModalState {
  onConfirm?: () => void;
}

export function useConfirmModal() {
  const dispatch = useDispatch();

  return (state: Omit<ConfirmModalState, 'show'>) => dispatch({...new ShowAction(state)});
}