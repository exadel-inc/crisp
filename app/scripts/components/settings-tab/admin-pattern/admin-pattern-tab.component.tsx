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

const patternsRest = restApi('patterns');

/**
 * Settings -> project -> configuration tab
*/

export function ConfigurationTab() {
  const patterns = useSelector((state: any) => state?.storage.patterns, shallowEqual) || [];
  const frameworks = useSelector((state: any) => state?.storage.framework, shallowEqual) || [];
  const updatePattern = async (id: string, updatedData: any) => {
    const data = await patternsRest.put(id, updatedData);
  
    if(data) {
      store.dispatch({
        type: ActionTypes.UPDATE_STORAGE_ITEM,
        payload: {
          key: 'patterns',
          data: updatedData,
          id: id
        }
      });
      showToast('Pattern successfully updated');
    } else {
      showToast('Can\'t update pattern in db. The application synchronizes this operation automatically');
    }
  };
  const showConfirmModal = useConfirmModal();
  
  const deletePattern = async (id: string) => {
    showConfirmModal({
      title: 'Delete confirmation',
      message: `Do you want to delete pattern`,
      onConfirm: async () => {
        const data = await patternsRest.del(id);
  
        if(data) {
          store.dispatch({
            type: ActionTypes.DELETE_STORAGE_ITEM,
            payload: {
              key: 'patterns',
              id: id
            }
          });
          showToast('pattern successfully deleated');
        } else {
          showToast('Can\'t deleted pattern from db. The application synchronizes this operation automatically');
        }
      }
    });
  };

  const createPattern = async (createData: any) => {
    const data = await patternsRest.post(createData);
  
    if(data) {
      store.dispatch({
        type: ActionTypes.ADD_STORAGE_ITEM,
        payload: {
          key: 'patterns',
          data: data
        }
      });
      showToast('Pattern successfully added');
    } else {
      showToast('Can\'t added pattern in db. The application synchronizes this operation automatically');
    }
  };

  return (
    <div className='admin-project-manager'>
      <div className='projects-section'>
        {
          patterns.map((pattern: any, index: number) =>
            <><ProjectPanel counter={index+1} projectName={pattern.name} editAction={() => {
              showConfirmModal({
                title: 'Update pattern',
                isHideButtons: true,
                body: <>
                <form className='admin-pattern-tab-form' onSubmit={async (e: any) => {
                  e.preventDefault();
                  const elements: any = e.target?.elements || {};
                  const patternName = elements.patternName.value;
                  const framework = elements.framework.value;
                  const script = elements.script.value;
                  const patternType = elements.patternType.value;
                  await updatePattern(pattern._id, {
                    name: patternName,
                    frameworkId: framework,
                    script: script,
                    type: patternType === 'action' ? 'ACTION' : 'PAGE_OBJECT'
                  });
                }}>
                  <InputComponent label='Pattern Name' name={'patternName'} formName={'patternName'} defaultValue={pattern.name} />
                  <SelectComponent name={'Framework'} formName={'framework'} optionList={frameworks} selectedId={(pattern.framework || pattern.frameworkId) } />
                  <SelectComponent name={'Pattern Type'} formName={'patternType'} optionList={[
                    {
                      _id: 'ACTION',
                      name: 'action'
                    },
                    {
                      _id: 'PAGE_OBJECT',
                      name: 'pageObject'
                    }
                  ]} selectedId={pattern.type} />
                  <TextComponent label={'Script'} isOnlyTextarea={true} formName={'script'} name={'Script'} defaultValue={pattern.script} />
                  <Button type={'submit'} buttonName={'Save'} iconClass={''} action={async () => {}} />
                </form>
                </>
              });
            }}
            deleteAction={() => {
              deletePattern((pattern._id || pattern.id));
            }} /></>
          )
        }
      </div>
      <div className='create-project-section'>
        <Button iconClass='' buttonName='Create pattern' action={() => {
          showConfirmModal({
            title: 'Create pattern',
            isHideButtons: true,
            body: <>
            <form className='admin-pattern-tab-form' onSubmit={async (e: any) => {
              e.preventDefault();
              const elements: any = e.target?.elements || {};
              const patternName = elements.patternName.value;
              const framework = elements.framework.value;
              const script = elements.script.value;
              const patternType = elements.patternType.value;
              await createPattern({
                name: patternName,
                frameworkId: framework,
                script: script,
                type: patternType === 'action' ? 'ACTION' : 'PAGE_OBJECT',
                date: "2022-07-29T14:11:35.118Z"
              });
            }}>
              <InputComponent label='Pattern Name'  formName={'patternName'} name={'patternName'} defaultValue={''} />
              <SelectComponent formName={'framework'} name={'Framework'} optionList={frameworks} />
              <SelectComponent name={'Pattern TYpe'} formName={'patternType'} optionList={[
                    'action',
                    'page object'
                  ]} />
              <TextComponent label={'Script'} formName={'script'} isOnlyTextarea={true} name={'script'} defaultValue={''} />
              <Button type={'submit'} buttonName={'Save'} iconClass={''} action={async () => {}} />
            </form>
            </>
          });
        }} />
      </div>
    </div>
  );
}
