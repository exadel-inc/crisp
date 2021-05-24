import { SettingsEntityType } from '../../../../shared/settings-constants';
import { WriteLoadedDataPayload } from '../../../../shared/settings-utilities';
import { showToast } from '../../../shared/toasts-component';

export class ImportExportUtils {

  /**
   * In order to use type confirm modal from this class
  */
  public static showImportTypeModal: (params: {
    onMerge: () => void;
    onOverride: () => void;
  }) => void;

  /**
   * Downloads text file
   * @param filename {string} - name of file
   * @param text {string} - file content
  */
  public static download(filename: string, text: string): void {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  /**
   * Copy saved data to clipboard
  */
  public static copyToClipboard (input: HTMLInputElement | null): void {
    if (input) {
      input.select();
      document.execCommand('copy');
    }
  };

  /**
   * Populates textarea with imported data
  */
  public static populateImportedFileData (files: FileList, setValue: (val: any) => void): void {
    const file = files[0];
    if (file) {
      const reader = new FileReader();
      const populate = (theFile: File) => (event: any) => setValue( event.target.result );
      reader.onload = populate(file);
      reader.readAsText(file);
    } else {
      setValue('');
    }
  };

  /**
   * Opens conflicts resolve (import type) modal if the are any conflicts
   * @param hasConflicts: {() => boolean} - function to check for conflicts
   * @param onDefault: {() => void} - executes if no conflicts
   * @param onMerge: {() => void} - executes if user choose to merge
   * @param onOverride: {() => void} - executes if user choose to override
   * @param callback {(msg: string) => void} - a callback function after confirmimg of loading data
  */
  public static writeLoadedData (
    hasConflicts: () => boolean,
    onDefault: () => void,
    onMerge: () => void,
    onOverride: () => void,
    callback: () => void
  ): void {
    if (hasConflicts()) {
      this.showImportTypeModal({
        onMerge: () => {
          onMerge();
          callback();
        },
        onOverride: () => {
          onOverride();
          callback();
        },
      });
    } else {
      onDefault();
      callback();
    }
  };

  /**
   * Loads data to storage
   * @param entity {SettingsEntityType} - entity case for import
   * @param onSuccesValidation {() => void} - a function called after successfull validationg of data
   * @param callbackFn {(msg: string) => void} - a callback function after confirmimg of loading data
  */
  public static loadData (
    entity: SettingsEntityType,
    importValue: string,
    onSuccesValidation: () => void,
    callbackFn: (msg: string) => void
  ): void {
    if (importValue) {
      try {
        const {successMessage, hasConflicts, onDefault, onMerge, onOverride} = new WriteLoadedDataPayload(entity, importValue);
        onSuccesValidation();
        this.writeLoadedData(hasConflicts, onDefault, onMerge, onOverride, () => callbackFn(successMessage));
      } catch (error) {
        const message = (error as Error).message;
        showToast(message, 'danger');
      };
    } else if (importValue !== null) {
      showToast('Please paste valid JSON', 'danger');
    }
  };

}
