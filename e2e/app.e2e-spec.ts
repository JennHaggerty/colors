import { ColorsPage } from './app.po';

describe('colors App', function() {
  let page: ColorsPage;

  beforeEach(() => {
    page = new ColorsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
