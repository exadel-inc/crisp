import { AddType, CommonService } from '../shared/common-service';
import { commonStorageService } from '../storage/common-storage-service';
import { Project } from './project';
import { CUCUMBER } from '../framework/standard-frameworks';
import { initialDate } from '../shared/initial-date';
import { StoreToStorageService } from '../storage/store-to-storage.service';
import clone from 'lodash/clone';
import { STANDARD_PROJECTS } from './standard-projects';

export class ProjectService implements CommonService<Project> {

  private _storage: StoreToStorageService<Project>;

  constructor() {
    this._storage = commonStorageService.registerStorage<Project>('projects', this._constructorFn, STANDARD_PROJECTS);
    this._init();
  }

  /**
   * Returns all projects of current framework.
   * If framework is omitted, returns all projects.
   * @param framework {string} Project framework.
  */
  public getMany(framework?: string): Project[] {
    return this._storageProjects.filter(pr => this._isOfSameQuery(pr, framework));
  }

  /**
   * Returns first project that match all criterias.
   * If any of parameters is omitted, takes the first project taken from all kinds of this parameter.
   * @param name {string} Project name.
   * @param framework {string} Project framework.
  */
  public find(name: string, framework?: string): Project | undefined {
    return this._storageProjects.find(pr => this._isSameProject(pr, name, framework));
  }

  /**
   * Returns first project that has same id.
   * @param name {id} Project id.
  */
  public findById(id: string): Project | undefined {
    return this._storageProjects.find((pr: Project) => pr.id === id);
  }

  /**
   * Returns the index of the project that has same id.
   * Returns -1 if no project found
   * @param id {string} Project id.
  */
  public getIndex(id: string): number {
    return this._storageProjects.findIndex((pr: Project) => pr.id === id);
  }

  /**
   * Saves project to storage.
   * If project with same id exists, logs error in console and doesn't save.
   * @param project {Project} Project to save.
   * @param index {number} The index at which the new project should be inserted in the list. Default is 0
  */
  public add(project: Project, index: number = 0): void {
    if (this.findById(project.id)) {
      throw new Error('Unable to save. Project already exist');
    } else {
      // a case when entity data doesn't have methods
      project.setDate && project.setDate();
      const projects: Project[] = this._storageProjects;
      projects.splice(index, 0, project);
      this._storage.write(projects);
    }
  }

  /**
   * Saves pages to storage.
   * @param projects {Project[]} Projects to save.
   * @param addType {AddType} Possible conflicts resolving logic:
   * FORCE_OVERRIDE - add new records and delete old ones
   * OVERWRITE_OLDER - owerwrite based on date
   * SKIP_EXISTING - do not replace existing records
  */
  public addMany(projects: Project[], addType = AddType.FORCE_OVERRIDE): void {
    // a case when entity data doesn't have methods
    projects.forEach((project: Project) => {
      project.setDate && project.setDate();
    });
    switch (addType) {
      case AddType.FORCE_OVERRIDE: {
        this._storage.write(projects);
        break;
      }
      case AddType.OVERWRITE_OLDER: {
        const newProjects = this._storageProjects;
        projects.forEach((project: Project) => {
          const sameProject = newProjects.find((pr: Project) => pr.id === project.id);
          if (sameProject) {
            if (project > sameProject) {
              const sameProjectIdx = newProjects.indexOf(sameProject);
              newProjects[sameProjectIdx] = project;
            }
          } else {
            newProjects.splice(0, 0, project);
          }
        });
        this._storage.write(newProjects);
        break;
      }
      case AddType.SKIP_EXISTING: {
        const newProjects = this._storageProjects;
        projects.forEach((project: Project) => {
          const sameProject = newProjects.find((pr: Project) => pr.id === project.id);
          if (!sameProject) {
            newProjects.splice(0, 0, project);
          }
        });
        this._storage.write(newProjects);
        break;
      }
      default: break;
    }
  }

  /**
   * Deletes project from storage.
   * If project doesn't exist, logs error in console and doesn't remove.
   * @param id {string} Project id.
  */
  public remove(id: string): void {
    if (!this.findById(id)) {
      throw new Error('Unable to remove. Project doesn`t exist');
    } else {
      const projects: Project[] = this._storageProjects.filter(pr => pr.id !== id);
      this._storage.write(projects);
    }
  }

  /**
   * Updates project with provided id.
   * @param id {string} project id.
   * @param dataToUpdate {Partial<Project>} Data to be updated in old project to create new one.
  */
  public update(id: string, dataToUpdate: Partial<Project>): void {
    if (!this.findById(id)) {
      throw new Error('Unable to update. Project doesn`t exist');
    } else {
      if (dataToUpdate.isDefault === true) {
        this._setDefault(id);
      }
      const projects: Project[] = this._storageProjects.map(pr =>  pr.id === id ? {...pr, ...dataToUpdate} as Project : pr);
      this._storage.write(projects);
    }
  }

  /**
   * Checks if current item is a valid Project (using duck typing)
   * @param item {unknown} an item for check
  */
  public isValid(item: unknown): boolean {
    if (item && typeof item === 'object') {
      const validPropNames = ['name', 'framework'];
      return validPropNames.every(propName => Object.keys(item).includes(propName));
    }
    return false;
  }

  /**
   * Deletes all projects from storage
  */
  public removeAll(): void {
    this._storage.write([]);
  }

  /**
   * Clones the project (only the object itself without dependencies)
   * @param project {Project} project.
  */
  public clone(project: Project): Project {
    return this._constructorFn(clone(project));
  }

  /**
   * Returns project with isDefault = true
  */
  public get currentProject(): Project | undefined {
    return this._storageProjects.find(pr => pr.isDefault);
  }

  /**
   * Analyze the storage, if there are no default project among storage projects, set first as default one.
  */
  public checkDefaultProject(): void {
    if (this._storageProjects.every(project => !project.isDefault)) {
      this._setDefault(this._storageProjects[0].id);
    }
  }

  /**
   * Set all other projects isDefault to false
   * @param projectId {string} default project.
  */
  private _setDefault(projectId: string): void {
    const projects: Project[] = this._storageProjects;
    projects.forEach(pr => pr.isDefault = pr.id === projectId);
    this._storage.write(projects);
  }

  private _isOfSameQuery(el: Project, framework?: string): boolean {
    return ((el.framework === framework) || !framework);
  }

  private _isSameProject(el: Project, name: string, framework?: string): boolean {
    return (el.name === name) && this._isOfSameQuery(el, framework);
  }

  /**
   * Projects that are stored in storage.
  */
  private get _storageProjects(): Project[] {
    return this._storage.read();
  }

  /**
   * Analyze the storage, and if no projects, add default one.
   * Checks for default project
  */
  private _init(): void {
    if (this._storageProjects.length === 0) {
      const projects = [new Project('Test Project 001', CUCUMBER, 'Default project', true, undefined, initialDate)];
      this._storage.write(projects);
    }
    this.checkDefaultProject();
  }

  /**
   * Project constructor.
  */
  private _constructorFn(pr: any) {
    return new Project(pr.name, pr.framework, pr.description, pr.isDefault, pr._id, pr.date);
  }
}
