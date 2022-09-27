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

const projectRest = restApi('projects');

/**
 * Settings -> project -> configuration tab
*/

export function ConfigurationTab() {
  const projects = useSelector((state: any) => state?.storage.projects, shallowEqual) || [];
  const frameworks = useSelector((state: any) => state?.storage.framework, shallowEqual) || [];
  const updateProject = async (id: string, updatedData: any) => {
    const data = await projectRest.put(id, updatedData);
  
    if(data) {
      store.dispatch({
        type: ActionTypes.UPDATE_STORAGE_ITEM,
        payload: {
          key: 'projects',
          data: updatedData,
          id: id
        }
      });
      showToast('Project successfully updated');
    } else {
      showToast('Can\'t update project in db. The application synchronizes this operation automatically');
    }
  };
  const showConfirmModal = useConfirmModal();
  
  const deleteProject = async (id: string) => {
    showConfirmModal({
      title: 'Delete confirmation',
      message: `Do you want to delete project`,
      onConfirm: async () => {
        const data = await projectRest.del(id);
  
        if(data) {
          store.dispatch({
            type: ActionTypes.DELETE_STORAGE_ITEM,
            payload: {
              key: 'projects',
              id: id
            }
          });
          showToast('Project successfully deleated');
        } else {
          showToast('Can\'t deleted project from db. The application synchronizes this operation automatically');
        }
      }
    });
  };

  const createProject = async (createData: any) => {
    const data = await projectRest.post(createData);
  
    if(data) {
      store.dispatch({
        type: ActionTypes.ADD_STORAGE_ITEM,
        payload: {
          key: 'projects',
          data: data
        }
      });
      showToast('Project successfully added');
    } else {
      showToast('Can\'t added project in db. The application synchronizes this operation automatically');
    }
  };

  return (
    <div className='admin-project-manager data-window-section'>
      <div className='projects-section'>
        {
          projects.map((project: any, index: number) =>
            <><ProjectPanel counter={index+1} projectName={project.name} editAction={() => {
              showConfirmModal({
                title: 'Update project',
                isHideButtons: true,
                body: <>
                <form className='admin-project-tab-form form-modal-popup' onSubmit={async (e: any) => {
                  e.preventDefault();
                  const elements: any = e.target?.elements || {};
                  const projectName = elements.projectName.value;
                  const framework = elements.framework.value;
                  const description = elements.description.value;
                  await updateProject(project._id, {
                    name: projectName,
                    frameworkId: framework,
                    description: description
                  });
                }}>
                  <InputComponent label='Project Name'  name={'ProjectName'} formName={'projectName'} defaultValue={project.name} />
                  <SelectComponent name={'Framework'} formName={'framework'} optionList={frameworks} selectedId={(project.framework || project.frameworkId) } />
                  <TextComponent label={'Description'} formName={'description'} defaultValue={project.description} />
                  <Button type={'submit'} buttonName={'Save'} iconClass={''} action={async () => {}} />
                </form>
                </>
              });
            }}
            deleteAction={() => {
              deleteProject((project._id || project.id));
            }} /></>
          )
        }
      </div>
      <div className='create-project-section'>
        <Button iconClass='' buttonName='Create Project' action={() => {
          showConfirmModal({
            title: 'Create project',
            isHideButtons: true,
            body: <>
              <form className='admin-project-tab-form form-modal-popup' onSubmit={async (e: any) => {
                e.preventDefault();
                const elements: any = e.target?.elements || {};
                const projectName = elements.projectName.value;
                const framework = elements.framework.value;
                const description = elements.description.value;
                await createProject({
                  name: projectName,
                  frameworkId: framework,
                  description: description,
                  isDefault: false,
                  date: "2022-07-29T14:11:35.118Z"
                });
              }}>
                <InputComponent label='Project Name'  formName={'projectName'} name={'projectName'} defaultValue={''} />
                <SelectComponent formName={'framework'} name={'framework'} optionList={frameworks} />
                <TextComponent label={'Description'} formName={'description'} defaultValue={''} />
                <Button type={'submit'} buttonName={'Save'} iconClass={''} action={async () => {}} />
              </form>
            </>
          });
        }} />
      </div>
    </div>
  );
}
