import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ErrorTypeEnum } from 'src/common/enums';
import { createError } from 'src/common/helpers';
import { CreateProjectDto, UpdateProjectDto } from '../dto';
import { ProjectEntity, ProjectEntityWithId } from '../project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(ProjectEntity.name) private readonly projectRepository: Model<ProjectEntity>,
  ) {}

  public async createProject(createProjectDto: CreateProjectDto): Promise<ProjectEntityWithId> {
    return new this.projectRepository(createProjectDto).save();
  }

  public bulkInsertProjects(createProjectDto: CreateProjectDto[]): Promise<ProjectEntityWithId[]> {
    return this.projectRepository.insertMany(createProjectDto).catch((err) => {
      throw err;
    });
  }

  public bulkRemoveProjects(field: string, values: string[]) {
    return this.projectRepository.remove({ [field]: { $in: values } });
  }

  public async getProjects(): Promise<ProjectEntity[]> {
    return this.projectRepository.find({});
  }

  public removeProject(field: string, value: string) {
    return this.projectRepository
      .find({ [field]: value })
      .remove()
      .exec();
  }

  public async updateProjectById(
    id: Types.ObjectId,
    payload: UpdateProjectDto,
  ): Promise<ProjectEntityWithId> {
    return this.projectRepository.findByIdAndUpdate(id, payload, { new: true }).exec();
  }

  public async deleteProjectById(id: Types.ObjectId): Promise<ProjectEntityWithId> {
    return this.projectRepository.findByIdAndRemove(id).exec();
  }

  public async getProjectBy(options: any): Promise<ProjectEntityWithId | null> {
    const project: ProjectEntityWithId = await this.projectRepository.findOne(options).exec();
    if (!project) {
      throw new NotFoundException(createError(ErrorTypeEnum.PROJECT_NOT_FOUND, options));
    }
    return project;
  }

  public async getProjectById(id: Types.ObjectId): Promise<ProjectEntityWithId | null> {
    return this.getProjectBy({ _id: id });
  }

  public async getProjectByName(name: string): Promise<ProjectEntityWithId | null> {
    return this.getProjectBy({ name });
  }
}
