import { Types } from 'mongoose';
import { PageEntityWithId } from 'src/modules/page/page.entity';
import { PatternEntityWithId } from 'src/modules/pattern/pattern.entity';
import { ElementMongoService, PageMongoService, PatternMongoService } from '../mongo-services';

const elementMongoService: ElementMongoService = new ElementMongoService();
const pageMongoService: PageMongoService = new PageMongoService();
const patternMongoService: PatternMongoService = new PatternMongoService();

const elements = [
  {
    name: 'Placeholder (for steps without elements)',
    description: '',
    selectors: {},
    pageObjectPattern: null,
    actionPatterns: [
      {
        customVars: {
          url: 'https://en.wikipedia.org',
        },
      },
    ],
    parentElementId: new Types.ObjectId(),
  },
  {
    name: 'Search Input',
    description: '',
    selectors: {
      elementCss: '#searchInput',
      elementId: new Types.ObjectId('61c1b5bed3dc3ec95cbdc4b6'),
      elementXPath: '//*[@id="searchInput"]',
    },
    pageObjectPattern: null,
    actionPatterns: [
      {
        customVars: {
          text: 'Lorem ipsum',
        },
      },
    ],
    parentElementId: new Types.ObjectId(),
  },
  {
    name: 'Search Button',
    description: '',
    selectors: {
      elementCss: '.pure-button',
      elementId: new Types.ObjectId(),
      elementXPath: '//*[@id="search-form"]/fieldset/button',
    },
    pageObjectPattern: null,
    actionPatterns: [
      {
        customVars: {},
      },
    ],
    parentElementId: new Types.ObjectId(),
  },
  {
    name: 'First Heading',
    description: '',
    selectors: {
      elementCss: '#firstHeading',
      elementId: new Types.ObjectId(),
      elementXPath: '//*[@id="firstHeading"]',
    },
    pageObjectPattern: null,
    actionPatterns: [
      {
        customVars: {
          text: 'Lorem ipsum',
        },
      },
    ],
    parentElementId: new Types.ObjectId(),
  },
];

module.exports.up = async function () {
  const page: PageEntityWithId = await pageMongoService.getPageByName('Wiki');
  const pattern: PatternEntityWithId = await patternMongoService.getPatternByName(
    'doubleclick link',
  );
  const payload = elements.map((element) => ({
    ...element,
    pageId: page._id,
    actionPatterns: element.actionPatterns.map((action) => ({ ...action, id: pattern._id })),
  }));
  await Promise.all(payload.map(elementMongoService.createElement.bind(elementMongoService)));
};

module.exports.down = async function () {
  await elementMongoService.bulkRemoveElements(
    'name',
    elements.map((element) => element.name),
  );
};
