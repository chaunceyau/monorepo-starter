import {DataSource, DataSourceConfig} from 'apollo-datasource';

export class BaseDataSource extends DataSource {
  user: any;
  initialize({context: {user}}: DataSourceConfig<{user: any}>) {
    this.user = user;
  }
}
