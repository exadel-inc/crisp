import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { CrispElement } from '../../elements/element';
import { Page } from '../../pages/page';
import { elementsService } from '../../shared/services';
import { PageElemementsTableRow } from './page-elements-table-row.component';
import { useConfirmModal } from '../shared/confirm-modal/confirm-modal';

/**
 * Main tab -> page elements tab content with table
 * @param isActive {boolean} is current tab active
 * @param page {Page} corresponding page
 * @param onAddElement {Function} function called on add element
 */
export function PageElememntsTable ({isActive, page, onAddElement}: {
  isActive: boolean;
  page: Page;
  onAddElement: (element: CrispElement) => void;
}) {

  /**
   * Elements of current page from storage
   */
  const elements: CrispElement[] = useSelector(() => elementsService.getMany(page.id));

  /**
   * Confirm modal
   */
  const showConfirmModal = useConfirmModal();

  /**
   * Component state: table is expanded
   */
  const [expanded, setExpanded] = useState(false);

  const confirmDelete = (element: CrispElement) => {
    showConfirmModal({
      title: 'Delete confirmation',
      message: `Delete Element ${element.name}?`,
      onConfirm: () => {
        elementsService.remove(element.id);
        console.log(`removed element ${element.id}`);
      },
    });
  };

  return (
    isActive ? <div className="container main-page-info">
      <table className={`table table-bordered table-sm ${expanded ? 'crisp-table-expand' : ''}`}>
        <thead>
          <tr>
            <th scope="col" id="page-elements-table-1">Element</th>
            <th scope="col" className="extended-param" id="page-elements-table-2">PO Pattern</th>
            <th scope="col" className="extended-param" id="page-elements-table-3">PO Params</th>
            <th scope="col" colSpan={2} id="page-elements-table-4">Actions\Verifications</th>
            <th scope="col" id="page-elements-table-5">
              <button type="button"
                className="btn btn-white btn-sm btn-block table-control"
                onClick={() => setExpanded(!expanded)}
              ><span className="icon-extend"></span></button>
            </th>
          </tr>
        </thead>
        <tbody>
          {elements.map(element =>
            <PageElemementsTableRow
              key={element.id}
              element={element}
              onAddElement={(element) => onAddElement(element)}
              onRemoveElement={() => confirmDelete(element)}
            />
          )}
        </tbody>
      </table>
    </div> : null
  );
};
