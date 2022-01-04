import { CreatePageDto, PageService } from '../../modules/page';
import { PageEntity, PageEntityWithId, PageModel } from '../../modules/page/page.entity';

export class PageMongoService {
  private readonly pageService: PageService;

  constructor() {
    this.pageService = new PageService(PageModel as any);
  }

  public getPages(): Promise<PageEntity[]> {
    return this.pageService.getPages();
  }

  public createPage(payload: CreatePageDto): Promise<PageEntityWithId> {
    return this.pageService.createPage(payload);
  }

  public bulkInsertPages(Pages: CreatePageDto[]): Promise<PageEntityWithId[]> {
    return this.pageService.bulkInsertPages(Pages);
  }

  public bulkRemovePages(field: string, values: string[]) {
    return this.pageService.bulkRemovePages(field, values);
  }

  public removePage(field: string, value: string) {
    return this.pageService.removePage(field, value);
  }

  public getPageByName(name: string) {
    return this.pageService.getPageByName(name);
  }
}
