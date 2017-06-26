import { ChatroomPage } from './app.po';

describe('chatroom App', () => {
  let page: ChatroomPage;

  beforeEach(() => {
    page = new ChatroomPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
