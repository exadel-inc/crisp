export interface CommonModalState {
  show: boolean;
  title?: string;
  message?: string;
  onCancel?: () => void;
}
