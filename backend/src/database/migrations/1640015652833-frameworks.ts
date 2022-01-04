import { FrameworkMongoService } from '../mongo-services';

const frameworkMongoService: FrameworkMongoService = new FrameworkMongoService();

const framework = {
  name: 'WebdriverIO Cucumber Boilerplate',
  description:
    'Cucumber Boilerplate\n\nStep patterns from Cucumber Boilerplate project to run WebdriverIO (v7) tests with Cucumber and brings true BDD to JavaScript.\n\nhttps://github.com/webdriverio/cucumber-boilerplate',
};

module.exports.up = async function () {
  await frameworkMongoService.createFramework(framework);
};

module.exports.down = async function () {
  await frameworkMongoService.removeFramework('name', framework.name);
};
