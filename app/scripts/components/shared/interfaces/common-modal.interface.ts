export interface CommonModalState {
  show: boolean;
  title?: string;
  message?: string;
  body?: any;
  isHideButtons?: boolean;
  onCancel?: () => void;
}
