import { CreateProjectDto } from '../../modules/project';
import {
  ProjectEntity,
  ProjectEntityWithId,
  ProjectModel,
} from '../../modules/project/project.entity';
import { ProjectService } from '../../modules/project/services';

export class ProjectMongoService {
  private readonly projectService: ProjectService;

  constructor() {
    this.projectService = new ProjectService(ProjectModel as any);
  }

  public getProjects(): Promise<ProjectEntity[]> {
    return this.projectService.getProjects();
  }

  public createProject(payload: CreateProjectDto): Promise<ProjectEntityWithId> {
    return this.projectService.createProject(payload);
  }

  public bulkInsertProjects(Projects: CreateProjectDto[]): Promise<ProjectEntityWithId[]> {
    return this.projectService.bulkInsertProjects(Projects);
  }

  public bulkRemoveProjects(field: string, values: string[]) {
    return this.projectService.bulkRemoveProjects(field, values);
  }

  public removeProject(field: string, value: string) {
    return this.projectService.removeProject(field, value);
  }

  public getProjectByName(name: string) {
    return this.projectService.getProjectByName(name);
  }
}
