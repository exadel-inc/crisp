import { CrispElement } from '../elements/element';
import { Framework } from '../framework/framework';
import { Page } from '../pages/page';
import { Pattern } from '../patterns/pattern';
import { PatternType } from '../patterns/pattern-interface';
import { Project } from '../project/project';
import store from '../redux/store';
import { commonStorageService, Storages } from '../storage/common-storage-service';
import { AddType, CommonService } from './common-service';
import { Entity } from './entity/entity';
import { elementsService, frameworksService, pagesService, patternService, projectsService, serviceMap } from './services';
import { SettingsEntityType } from './settings-constants';

const constructorFns: any = {
  patterns: (item: any) => patternService.clone(item),
  elements: (item: any) => elementsService.clone(item),
  pages: (item: any) => pagesService.clone(item),
  projects: (item: any) => projectsService.clone(item),
  framework: (item: any) => frameworksService.clone(item),
};

export class WriteLoadedDataPayload {

  constructor( entity: string, data: string) {

    let successMessage: string;
    let hasConflicts: () => boolean = () => false;
    let onDefault: () => void = () => {};
    let onMerge: () => void = () => {};
    let onOverride: () => void = () => {};

    const parsedData: {[key: string]: Entity[]} = this.getValidatedData(data);

    switch (entity) {

      case SettingsEntityType.PAGE_OBJECT_PATTERN: {
        const selectedFramework = getSelectedFramework(PatternType.PAGE_OBJECT);
        // check if PO patterns are of currently selected framework
        const patternOfDifferentFramework = parsedData.patterns && (parsedData.patterns as Pattern[])
          .filter(pt => pt.type === PatternType.PAGE_OBJECT)
          .find(item => item.framework !== selectedFramework);
        if (patternOfDifferentFramework) {
          throw new Error(`Unable to import "${patternOfDifferentFramework.framework}" PO patterns into currently selected Framework: "${selectedFramework}"`);
        }

        successMessage = 'New data loaded for Page Object patterns';
        hasConflicts = () => {
          if (parsedData.patterns) {
            return !!(parsedData.patterns as Pattern[])
              .filter(pt => pt.type === PatternType.PAGE_OBJECT)
              .find(pt => patternService.findById(pt.id));
          }
          return false;
        };
        onDefault = () => {
          if (parsedData.patterns) {
            patternService.addMany((parsedData.patterns as Pattern[]).filter(pt => pt.type === PatternType.PAGE_OBJECT), AddType.SKIP_EXISTING);
          }
        };
        onMerge = () => {
          if (parsedData.patterns) {
            patternService.addMany((parsedData.patterns as Pattern[]).filter(pt => pt.type === PatternType.PAGE_OBJECT), AddType.OVERWRITE_OLDER);
          }
        };
        onOverride = () => {
          if (parsedData.patterns) {
            patternService.addMany((parsedData.patterns as Pattern[]).filter(pt => pt.type === PatternType.PAGE_OBJECT), AddType.FORCE_OVERRIDE, PatternType.PAGE_OBJECT);
          }
        };
        break;
      }

      case SettingsEntityType.ACTION_PATTERN: {
        const selectedFramework = getSelectedFramework(PatternType.PAGE_OBJECT);
        // check if Action patterns are of currently selected framework
        const patternOfDifferentFramework = parsedData.patterns && (parsedData.patterns as Pattern[])
          .filter(pt => pt.type === PatternType.ACTION)
          .find(item => item.framework !== selectedFramework);
        if (patternOfDifferentFramework) {
          throw new Error(`Unable to import "${patternOfDifferentFramework.framework}" Action patterns into currently selected Framework: "${selectedFramework}"`);
        }

        successMessage = 'New data loaded for Action patterns';
        hasConflicts = () => {
          if (parsedData.patterns) {
            return !!(parsedData.patterns as Pattern[])
              .filter(pt => pt.type === PatternType.ACTION)
              .find(pt => patternService.findById(pt.id));
          }
          return false;
        };
        onDefault = () => {
          if (parsedData.patterns) {
            patternService.addMany((parsedData.patterns as Pattern[]).filter(pt => pt.type === PatternType.ACTION), AddType.SKIP_EXISTING);
          }
        };
        onMerge = () => {
          if (parsedData.patterns) {
            patternService.addMany((parsedData.patterns as Pattern[]).filter(pt => pt.type === PatternType.ACTION), AddType.OVERWRITE_OLDER);
          }
        };
        onOverride = () => {
          if (parsedData.patterns) {
            patternService.addMany((parsedData.patterns as Pattern[]).filter(pt => pt.type === PatternType.ACTION), AddType.FORCE_OVERRIDE, PatternType.ACTION);
          }
        };
        break;
      }

      case SettingsEntityType.FRAMEWORK: {
        successMessage = 'New data loaded for Frameworks and Patterns';
        // include patterns of provided frameworks only
        const frameworkIds = ((parsedData.framework || []) as Framework[]).map(fr => fr.id);
        hasConflicts = () => {
          let conflictsInFramework = false;
          let conflictsInPatterns = false;
          if (parsedData.framework) {
            conflictsInFramework = !!(parsedData.framework as Framework[])
              .find(fr => frameworksService.findById(fr.id));
          }
          if (parsedData.patterns) {
            conflictsInPatterns = !!(parsedData.patterns as Pattern[])
              .filter(pt => frameworkIds.includes(pt.framework))
              .find(pt => patternService.findById(pt.id));
          }
          return conflictsInFramework || conflictsInPatterns;
        };
        onDefault = () => {
          if (parsedData.framework) {
            frameworksService.addMany((parsedData.framework as Framework[]), AddType.SKIP_EXISTING);
          }
          if (parsedData.patterns) {
            patternService.addMany((parsedData.patterns as Pattern[]).filter(pt => frameworkIds.includes(pt.framework)), AddType.SKIP_EXISTING);
          }
        };
        onMerge = () => {
          if (parsedData.framework) {
            frameworksService.addMany((parsedData.framework as Framework[]), AddType.OVERWRITE_OLDER);
          }
          if (parsedData.patterns) {
            patternService.addMany((parsedData.patterns as Pattern[]).filter(pt => frameworkIds.includes(pt.framework)), AddType.OVERWRITE_OLDER);
          }
        };
        onOverride = () => {
          if (parsedData.framework) {
            frameworksService.addMany((parsedData.framework as Framework[]), AddType.FORCE_OVERRIDE);
          }
          if (parsedData.patterns) {
            patternService.addMany((parsedData.patterns as Pattern[]).filter(pt => frameworkIds.includes(pt.framework)), AddType.FORCE_OVERRIDE);
          }
        };
        break;
      }

      case SettingsEntityType.PAGES: {
        successMessage = 'New data loaded for Pages';
        // check if pages are of currently selected project
        const pageOfDifferentProject = parsedData.pages && (parsedData.pages as Page[])
          .find(item => item.project !== projectsService.currentProject?.id);
        if (pageOfDifferentProject) {
          throw new Error(`Unable to import Pages into currently selected Project: ${projectsService.currentProject?.name}`);
        }
        // include elements of provided pages only
        const pageIds = ((parsedData.pages || []) as Page[]).map(page => page.id);

        hasConflicts = () => {
          let conflictsInPages = false;
          let conflictsInElements= false;
          if (parsedData.pages) {
            conflictsInPages = !!(parsedData.pages as Page[])
              .find(pt => pagesService.findById(pt.id));
          }
          if (parsedData.elements) {
            conflictsInElements = !!(parsedData.elements as CrispElement[])
              .filter(pt => pageIds.includes(pt.page))
              .find(pt => elementsService.findById(pt.id));
          }
          return conflictsInPages || conflictsInElements;
        };
        onDefault = () => {
          if (parsedData.pages) {
            pagesService.addMany((parsedData.pages as Page[]), AddType.SKIP_EXISTING);
          }
          if (parsedData.elements) {
            elementsService.addMany(
              (parsedData.elements as CrispElement[])
                .filter(pt => pageIds.includes(pt.page)),
              AddType.SKIP_EXISTING
            );
          }
        };
        onMerge = () => {
          if (parsedData.pages) {
            pagesService.addMany((parsedData.pages as Page[]), AddType.OVERWRITE_OLDER);
          }
          if (parsedData.elements) {
            elementsService.addMany(
              (parsedData.elements as CrispElement[])
                .filter(pt => pageIds.includes(pt.page)),
              AddType.OVERWRITE_OLDER
            );
          }
        };
        onOverride = () => {
          if (parsedData.pages) {
            pagesService.addMany((parsedData.pages as Page[]), AddType.FORCE_OVERRIDE);
          }
          if (parsedData.elements) {
            elementsService.addMany(
              (parsedData.elements as CrispElement[])
                .filter(pt => pageIds.includes(pt.page)),
              AddType.FORCE_OVERRIDE
            );
          }
        };
        break;
      }

      case SettingsEntityType.PROJECTS: {
        successMessage = 'New data loaded for Projects, Pages and Elements';
        // include pages of provided projects only
        // include elements of provided pages only
        const projectDatas = ((parsedData.projects || []) as Project[]);
        const pageIds = ((parsedData.pages || []) as Page[]).map(page => page.id);
        const unknownFrameworks = projectDatas.map(({framework}) => framework).filter(framework => !frameworksService.findById(framework));
        const importedNewFrameworks = ((parsedData.framework || []) as Framework[]).filter(fr => unknownFrameworks.includes(fr.id));
        // check if unknown framework exist in import, if not, creates it
        const addUnknownFrameworks = () => {
          if (unknownFrameworks.length) {
            if (parsedData.framework && importedNewFrameworks.length) {
              frameworksService.addMany(importedNewFrameworks, AddType.OVERWRITE_OLDER);
            }
            const unknownNewFrameworks = unknownFrameworks
              .filter(fr => !importedNewFrameworks.map(item => item.id).includes(fr))
              .map( fr => new Framework(fr));
            if (unknownNewFrameworks.length) {
              frameworksService.addMany(unknownNewFrameworks, AddType.OVERWRITE_OLDER);
            }
          }
        };

        hasConflicts = () => {
          let conflictsInProjects = false;
          let conflictsInPages = false;
          let conflictsInElements= false;
          if (parsedData.projects) {
            conflictsInProjects = !!(parsedData.projects as Project[])
              .find(pt => projectsService.findById(pt.id));
          }
          if (parsedData.pages) {
            conflictsInPages = !!(parsedData.pages as Page[])
              .filter(pt => !!projectDatas.find(data => data.id === pt.project))
              .find(pt => pagesService.findById(pt.id));
          }
          if (parsedData.elements) {
            conflictsInElements = !!(parsedData.elements as CrispElement[])
              .filter(pt => pageIds.includes(pt.page))
              .find(pt => elementsService.findById(pt.id));
          }

          return conflictsInProjects || conflictsInPages || conflictsInElements;
        };
        onDefault = () => {
          if (parsedData.projects) {
            projectsService.addMany((parsedData.projects as Project[]).map(project => {
              project.isDefault = false;
              return project;
            }), AddType.SKIP_EXISTING);
            projectsService.checkDefaultProject();
          }
          if (parsedData.pages) {
            pagesService.addMany(
              (parsedData.pages as Page[])
                .filter(pt => !!projectDatas.find(data => data.id === pt.project)),
              AddType.SKIP_EXISTING
            );
          }
          if (parsedData.elements) {
            elementsService.addMany(
              (parsedData.elements as CrispElement[])
                .filter(pt => pageIds.includes(pt.page)),
              AddType.SKIP_EXISTING
            );
          }
          addUnknownFrameworks();
        };
        onMerge = () => {
          if (parsedData.projects) {
            projectsService.addMany((parsedData.projects as Project[]).map(project => {
              project.isDefault = false;
              return project;
            }), AddType.OVERWRITE_OLDER);
            projectsService.checkDefaultProject();
          }
          if (parsedData.pages) {
            pagesService.addMany(
              (parsedData.pages as Page[])
                .filter(pt => !!projectDatas.find(data => data.id === pt.project)),
              AddType.OVERWRITE_OLDER
            );
          }
          if (parsedData.elements) {
            elementsService.addMany(
              (parsedData.elements as CrispElement[])
                .filter(pt => pageIds.includes(pt.page)),
              AddType.OVERWRITE_OLDER
            );
          }
          addUnknownFrameworks();
        };
        onOverride = () => {
          if (parsedData.projects) {
            projectsService.addMany((parsedData.projects as Project[]).map(project => {
              project.isDefault = false;
              return project;
            }), AddType.FORCE_OVERRIDE);
            projectsService.checkDefaultProject();
          }
          if (parsedData.pages) {
            pagesService.addMany(
              (parsedData.pages as Page[])
                .filter(pt => !!projectDatas.find(data => data.id === pt.project)),
              AddType.FORCE_OVERRIDE
            );
          }
          if (parsedData.elements) {
            elementsService.addMany(
              (parsedData.elements as CrispElement[])
                .filter(pt => pageIds.includes(pt.page)),
              AddType.FORCE_OVERRIDE
            );
          }
          addUnknownFrameworks();
        };
        break;
      }

      case SettingsEntityType.STORAGE: {
        // no additional checks here - import with minimum validation
        successMessage = 'New data loaded for all storages';
        hasConflicts = () => {
          return !!(parsedData.patterns as Pattern[]).find(item => patternService.findById(item.id))
            || !!(parsedData.framework as Framework[]).find(item => frameworksService.findById(item.id))
            || !!(parsedData.elements as CrispElement[]).find(item => elementsService.findById(item.id))
            || !!(parsedData.projects as Project[]).find(item => projectsService.findById(item.id))
            || !!(parsedData.pages as Page[]).find(item => pagesService.findById(item.id));
        };
        onDefault = () => {
          Object.entries(serviceMap).forEach(([key, service]) =>  service.addMany(parsedData[key], AddType.SKIP_EXISTING));
        };
        onMerge = () => {
          Object.entries(serviceMap).forEach(([key, service]) =>  service.addMany(parsedData[key], AddType.OVERWRITE_OLDER));
        };
        onOverride = () => {
          Object.entries(serviceMap).forEach(([key, service]) =>  service.addMany(parsedData[key], AddType.FORCE_OVERRIDE));
        };
        break;
      }
      default: {
        throw new Error(`Unknown entity name: ${entity}`);
      }
    }

    this.successMessage = successMessage;
    this.hasConflicts = hasConflicts;
    this.onDefault = onDefault;
    this.onMerge = onMerge;
    this.onOverride = onOverride;

  }

  public successMessage: string;
  public hasConflicts: () => boolean = () => false;
  public onDefault: () => void = () => {};
  public onMerge: () => void = () => {};
  public onOverride: () => void = () => {};

  /**
   * Parses data string and throws errors if format is incorrect
   * Returns parsed data
   * @param data {string} - data in string format
  */
  private getValidatedData(data: string) {
    const validKeys = Object.keys(commonStorageService.storages);
    const parsedData: {[key: string]: Entity[]} = JSON.parse(data);
    const serviceMap: {[key: string]: CommonService<any>} = {
      pages: pagesService,
      projects: projectsService,
      elements: elementsService,
      framework: frameworksService,
      patterns: patternService,
    };
    if (typeof parsedData !== 'object') {
      throw new Error('Invalid data format');
    }
    Object.keys(parsedData).forEach(key => {
      if (!validKeys.includes(key)) {
        throw new Error(`Invalid property: ${key}`);
      }
      if (!Array.isArray(parsedData[key])) {
        throw new Error(`${key} must be an array`);
      }
      // const settings = Object.values(tabIdSettings).find(setting => setting.storageKey === key);
      const constructorFn = constructorFns[key];
      const items = parsedData[key];
      parsedData[key] = items.map(item => {
        if (!serviceMap[key].isValid(item)) {
          throw new Error(`Error in ${key}: ${JSON.stringify(item)} is not a valid instance of ${key}`);
        }
        // addIdGetter(item);
        return constructorFn ? constructorFn(item) : item;
      });
    });
    return parsedData;
  }
};

export class GetSavedData {

  constructor(entity: string, forCurrentProject = false) {
    let successMessage: string = '';
    const currentProject = projectsService.currentProject?.id;
    const currentProjectFramework = projectsService.currentProject?.framework;

    const storages: Storages = commonStorageService.storages;
    const storageData: {[key: string]: Entity[]} = Object.keys(storages).reduce((acc: any, key: string) => {
      const storageItems = storages[key].read();
      storageItems.forEach(item => addIdGetter(item));
      acc[key] = storageItems;
      return acc;
    }, {});

    switch (entity) {

      case SettingsEntityType.PAGE_OBJECT_PATTERN: {
        successMessage = 'Saved data from Page Object patterns';
        const selectedFramework = getSelectedFramework(PatternType.PAGE_OBJECT);
        delete storageData.pages;
        delete storageData.projects;
        delete storageData.elements;
        delete storageData.framework;
        storageData.patterns = ((storageData.patterns || []) as Pattern[])
          .filter(pt => pt.type === PatternType.PAGE_OBJECT)
          .filter(pt => !forCurrentProject || (pt.framework === selectedFramework));
        if (!storageData.patterns.length) {
          delete storageData.patterns;
        }
        break;
      }

      case SettingsEntityType.ACTION_PATTERN: {
        successMessage = 'Saved data from Action patterns';
        const selectedFramework = getSelectedFramework(PatternType.ACTION);
        delete storageData.pages;
        delete storageData.projects;
        delete storageData.elements;
        delete storageData.framework;
        storageData.patterns = ((storageData.patterns || []) as Pattern[])
          .filter(pt => pt.type === PatternType.ACTION)
          .filter(pt => !forCurrentProject || (pt.framework === selectedFramework));
        if (!storageData.patterns.length) {
          delete storageData.patterns;
        }
        break;
      }

      case SettingsEntityType.FRAMEWORK: {
        successMessage = 'Saved data from Frameworks';
        delete storageData.pages;
        delete storageData.projects;
        delete storageData.elements;
        storageData.framework = ((storageData.framework || []) as Framework[])
          .filter(fr => !forCurrentProject || (fr.id === currentProjectFramework));
        storageData.patterns = ((storageData.patterns || []) as Pattern[])
          .filter(pt => !forCurrentProject || (pt.framework === currentProjectFramework));
        if (!storageData.framework.length) {
          delete storageData.framework;
        }
        if (!storageData.patterns.length) {
          delete storageData.patterns;
        }
        break;
      }

      case SettingsEntityType.PAGES: {
        successMessage = 'Saved data from Pages';
        delete storageData.projects;
        delete storageData.framework;
        delete storageData.patterns;
        storageData.elements = ((storageData.elements || []) as CrispElement[])
          .filter(el => {
            const elPage = pagesService.findById(el.page);
            return !forCurrentProject || ((elPage?.project === currentProject));
          });
        storageData.pages = ((storageData.pages || []) as Page[])
          .filter(pg => !forCurrentProject || (pg.project === currentProject));
        if (!storageData.elements.length) {
          delete storageData.elements;
        }
        if (!storageData.pages.length) {
          delete storageData.pages;
        }
        break;
      }

      case SettingsEntityType.PROJECTS: {
        successMessage = 'Saved data from Projects';
        delete storageData.framework;
        delete storageData.patterns;
        storageData.elements = ((storageData.elements || []) as CrispElement[])
          .filter(el => {
            const elPage = pagesService.findById(el.page);
            return !forCurrentProject || ((elPage?.project === currentProject));
          });
        storageData.pages = ((storageData.pages || []) as Page[])
          .filter(pg => !forCurrentProject || ((pg.project === currentProject)));
        storageData.projects = ((storageData.projects || []) as Project[])
          .filter(pr => !forCurrentProject || (pr.id === currentProject));
        if (!storageData.elements.length) {
          delete storageData.elements;
        }
        if (!storageData.pages.length) {
          delete storageData.pages;
        }
        if (!storageData.projects.length) {
          delete storageData.projects;
        }
        break;
      }

      case SettingsEntityType.STORAGE: {
        successMessage = 'Saved data from whole storage';
        break;
      }
      default: {
        throw new Error(`Unknown entity name: ${entity}`);
      }
    }

    this.successMessage = successMessage;
    this.data = JSON.stringify(storageData, null, 2);
  }

  public data: string;
  public successMessage: string;
}

/**
 * Adds id getter to the object.
 * We don't have id getter after parsing the imported data from string
 * to use it for latest checks we have to add it manually
 * @param item {any} - Parsed from string object
*/
function addIdGetter(item: any): void {
  if (!item.id && item._id) {
    Object.defineProperty(item, 'id', {
      get: function() {
        return this._id;
      }
    });
  }
}

/**
 * Returns the selected framework id from PO and Action settings dropdowns
 * @param patternType {PatternType} - Pattern type
*/
function getSelectedFramework(patternType: PatternType) {
  const patternTypeSelectorMap: {[key: string]: 'objects' | 'actions'} = {
    [PatternType.PAGE_OBJECT]: 'objects',
    [PatternType.ACTION]: 'actions',
  };
  const optionsFilter: any = store.getState().settings.framework[patternTypeSelectorMap[patternType]].filter;
  return optionsFilter.framework || projectsService.currentProject?.framework;
}
