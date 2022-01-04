import { ProjectEntityWithId } from 'src/modules/project/project.entity';
import { PageMongoService, ProjectMongoService } from '../mongo-services';

const pageMongoService: PageMongoService = new PageMongoService();
const projectMongoService: ProjectMongoService = new ProjectMongoService();

const page = {
  name: 'Wiki',
  description: 'Wikipedia homepage',
};

module.exports.up = async function () {
  const project: ProjectEntityWithId = await projectMongoService.getProjectByName('Demo');
  await pageMongoService.createPage({ ...page, projectId: project._id });
};

module.exports.down = async function () {
  await pageMongoService.removePage('name', page.name);
};
