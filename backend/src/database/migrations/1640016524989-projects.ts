import { FrameworkEntityWithId } from 'src/modules/framework/framework.entity';
import { FrameworkMongoService, ProjectMongoService } from '../mongo-services';

const projectMongoService: ProjectMongoService = new ProjectMongoService();
const frameworkMongoService: FrameworkMongoService = new FrameworkMongoService();

const project = {
  name: 'Demo',
  description: 'Demo Wiki project',
  isDefault: true,
};

module.exports.up = async function () {
  const framework: FrameworkEntityWithId = await frameworkMongoService.getFrameworkByName(
    'WebdriverIO Cucumber Boilerplate',
  );
  await projectMongoService.createProject({ ...project, frameworkId: framework._id });
};

module.exports.down = async function () {
  await projectMongoService.removeProject('name', project.name);
};
