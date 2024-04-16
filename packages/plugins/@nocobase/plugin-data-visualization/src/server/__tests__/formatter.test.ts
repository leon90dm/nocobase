import { formatter } from '../actions/formatter';

describe('formatter', () => {
  const field = 'field';
  const format = 'YYYY-MM-DD hh:mm:ss';
  it('should return correct format for sqlite', () => {
    const sequelize = {
      fn: (fn: string, format: string, field: string) => ({
        fn,
        format,
        field,
      }),
      col: (field: string) => field,
      getDialect: () => 'sqlite',
    };
    const result = formatter(sequelize, 'datetime', field, format);
    expect(result.format).toEqual('%Y-%m-%d %H:%M:%S');
  });

  it('should return correct format for mysql', () => {
    const sequelize = {
      fn: (fn: string, field: string, format: string) => ({
        fn,
        format,
        field,
      }),
      col: (field: string) => field,
      getDialect: () => 'mysql',
    };
    const result = formatter(sequelize, 'datetime', field, format);
    expect(result.format).toEqual('%Y-%m-%d %H:%i:%S');
  });

  it('should return correct format for postgres', () => {
    const sequelize = {
      fn: (fn: string, field: string, format: string) => ({
        fn,
        format,
        field,
      }),
      col: (field: string) => field,
      getDialect: () => 'postgres',
    };
    const result = formatter(sequelize, 'datetime', field, format);
    expect(result.format).toEqual('YYYY-MM-DD HH24:MI:SS');
  });
});
