import { PatternService } from '../patterns/pattern-service';
import { PagesService } from '../pages/pages-service';
import { ElementService } from '../elements/element-service';
import { FrameworkService } from '../framework/framework-service';
import { ProjectService } from '../project/project-service';
import { CommonService } from './common-service';

// in order to have each service as a singleton across the application
export const patternService: PatternService = new PatternService();
export const pagesService: PagesService = new PagesService();
export const elementsService: ElementService = new ElementService();
export const frameworksService: FrameworkService = new FrameworkService();
export const projectsService: ProjectService = new ProjectService();

export const serviceMap: {[key: string]: CommonService<any>} = {
  pages: pagesService,
  projects: projectsService,
  elements: elementsService,
  framework: frameworksService,
  patterns: patternService,
};
