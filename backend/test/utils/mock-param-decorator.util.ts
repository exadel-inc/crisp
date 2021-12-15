import { ROUTE_ARGS_METADATA } from '@nestjs/common/constants';

export function getParamDecoratorFactory(
  decorator: Function, // eslint-disable-line @typescript-eslint/ban-types
): (data: any, request: any) => any {
  class Test {
    public test(@decorator() value: any): any {
      return value;
    }
  }

  const args = Reflect.getMetadata(ROUTE_ARGS_METADATA, Test, 'test');
  return (data: any, request: any) =>
    args[Object.keys(args)[0]].factory(data, {
      switchToHttp: () => ({
        getRequest: () => request,
      }),
    });
}
