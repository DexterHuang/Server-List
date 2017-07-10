import { ServerListPage } from './app.po';

describe('server-list App', () => {
  let page: ServerListPage;

  beforeEach(() => {
    page = new ServerListPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
