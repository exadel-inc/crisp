import * as React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { restApi } from '../../../serverRestApi';
import { Button } from '../../button/button';
import store from '../../../redux/store';
import { ActionTypes } from '../../../redux/reducers/storage/storage.actions';
import { ProjectPanel } from '../../projectPanel/projectPanel';
import { useConfirmModal } from '../../shared/confirm-modal/confirm-modal';
import { InputComponent } from '../../inputComponent/inputComponent';
import { TextComponent } from '../../textComponent/textComponent';
import { SelectComponent } from '../../selectComponent/selectComponent';
import { showToast } from '../../shared/toasts-component';

const frameworkRest = restApi('framework');

/**
 * Settings -> framework -> configuration tab
*/
export function ConfigurationTab() {
  const frameworks = useSelector((state: any) => state?.storage.framework, shallowEqual) || [];
  const updateProject = async (id: string, updatedData: any) => {
    const data = await frameworkRest.put(id, updatedData);
  
    if(data) {
      store.dispatch({
        type: ActionTypes.UPDATE_STORAGE_ITEM,
        payload: {
          key: 'framework',
          data: updatedData,
          id: id
        }
      });
      showToast('Framework successfully updated');
    } else {
      showToast('Can\'t update framework in db. The application synchronizes this operation automatically');
    }
  };
  const showConfirmModal = useConfirmModal();
  
  const deleteFramework = async (id: string) => {
    const data = await frameworkRest.del(id);
  
    if(data) {
      store.dispatch({
        type: ActionTypes.DELETE_STORAGE_ITEM,
        payload: {
          key: 'framework',
          id: id
        }
      });
      showToast('Framework successfully deleated');
    } else {
      showToast('Can\'t deleted framework from db. The application synchronizes this operation automatically');
    }
  };

  const createFramework = async (createData: any) => {
    const data = await frameworkRest.post(createData);
  
    if(data) {
      store.dispatch({
        type: ActionTypes.ADD_STORAGE_ITEM,
        payload: {
          key: 'framework',
          data: data
        }
      });
      showToast('Framework successfully added');
    } else {
      showToast('Can\'t added framework in db. The application synchronizes this operation automatically');
    }
  };

  return (
    <div className='admin-project-manager'>
      <div className='projects-section'>
        {
          frameworks.map((framework: any, index: number) =>
            <><ProjectPanel counter={0} projectName={framework.name} editAction={() => {
              showConfirmModal({
                title: 'Update framework',
                isHideButtons: true,
                body: <>
                <form onSubmit={async (e: any) => {
                  e.preventDefault();
                  const elements: any = e.target?.elements || {};
                  const frameworkName = elements.frameworkName.value;
                  const description = elements.description.value;
                  await updateProject(framework._id, {
                    name: frameworkName,
                    description: description
                  });
                }}>
                  <InputComponent name={'frameworkName'} formName={'frameworkName'} defaultValue={framework.name} />
                  <TextComponent isOnlyTextarea={true} formName={'description'} name={'Description'} defaultValue={framework.description} />
                  <Button type={'submit'} buttonName={'Save'} iconClass={''} action={async () => {}} />
                </form>
                </>
              });
            }}
            deleteAction={() => {
              deleteFramework((framework._id || framework.id));
            }} /></>
          )
        }
      </div>
      <div className='create-project-section'>
        <Button iconClass='' buttonName='Create Framework' action={() => {
          showConfirmModal({
            title: 'Update framework',
            isHideButtons: true,
            body: <>
            <form onSubmit={async (e: any) => {
              e.preventDefault();
              const elements: any = e.target?.elements || {};
              const frameworkName = elements.frameworkName.value;
              const description = elements.description.value;
              await createFramework({
                name: frameworkName,
                description: description,
                date: "2022-07-29T14:11:35.118Z"
              });
            }}>
              <InputComponent formName={'frameworkName'} name={'frameworkName'} defaultValue={''} />
              <TextComponent formName={'description'} isOnlyTextarea={true} name={'description'} defaultValue={''} />
              <Button type={'submit'} buttonName={'Save'} iconClass={''} action={async () => {}} />
            </form>
            </>
          });
        }} />
      </div>
    </div>
  );
}