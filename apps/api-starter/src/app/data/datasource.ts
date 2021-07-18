import {DataSource} from 'apollo-datasource';

interface Session {}

export class BaseDataSource extends DataSource {
  public session: Session;

  initialize({context}) {
    console.log({context});
    console.log({consdalfm: context.req});
    this.session = context.req.user;
  }
}
