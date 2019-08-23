/** 
 * the decorator for  class,method ,property and method parameter 
 * this will be used in invoke  the service interface like C#
 * use lambda express like my framework in .net
 * added by changhl,2018-10-24
 */

import "reflect-metadata";

export class Ioc {}

/**
 *
 * @param target 类装饰器
 */
export function ClassDecorator<T>(target?: any) {
  // type t = T;
  console.log("params is ", arguments);

  return (x: Function) => {
    let metas = Reflect.getMetadata("design:paramtypes", x);
    console.log("this metas is ", metas);
    console.log("meta is ", x.prototype.$Meta);
    console.log("string is ", x.toString(), x.name);
    console.log(x);
    // return x;
  };
}
/**
 * 方法装饰器
 */
export function MethodDecorator() {
  return (target, methodName: string, descriptor: PropertyDescriptor) => {};
}

/**
 * 方法参数装饰器
 */
export function MethodParameterDecorator() {
  return (target, methodName: string, paramIndex: number) => {};
}

/**
 * 属性装饰器
 */
export function PropDecorator(target: any, propertyName: string) {
  let t = Reflect.getMetadata("design:type", target, propertyName);
  console.log(t);
  // console.log(`${propertyName} type: ${t.name}`);
  // return (target: any, propertyName: string) => {
  //   console.log(target);
  //   let x = Reflect.getMetadata("design:type", target, propertyName);
  //   console.log("properType:", x);
  // };
}
