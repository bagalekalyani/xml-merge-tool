import { renderComponent, expect } from '../test_helper';
import Login from '../../src/modules/login/components/Login';


// Use 'describe' to group together similar tests
describe('Login', () => {
  let component =;

  beforeEach(() => {
    component = renderComponent(Login);
  });

  it('shows a login screen', () => {
    expect(component.find('.login-screen')).to.exist;
  });
});
