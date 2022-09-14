// 增强目标类的方法功能
class StringUtil {//工具类
  public static trimSpace(str: string): string {
    return str.replace(/\s+/g, "")
  }
}
function MethodInterceptor(params: string) {
  return function (targetClassPrototype: any, methodname: string,
    dataprops: PropertyDescriptor) {

    let datapropsmethod = dataprops.value;//保存的时DistribRoles方法
    console.log("前置拦截");
    dataprops.value();
    dataprops.value = function (...args: any) {
      args = args.map((arg: any) => {
        if (typeof arg === "string") {
          return StringUtil.trimSpace(arg)
        }
        return arg;
      })
      console.log("args:", args);
    }
    dataprops.value("我 是  大幅");//后置拦截【执行完方法后还想做别的事情】
  }
}
// 方法装饰器实现拦截器前置、后置功能
class RoleService {
  public roleName: string = "管理员"
  constructor() {
  }

  @MethodInterceptor("DistribRoles方法")
  DistribRoles(userName: string, isValid: boolean) {// 分配角色

    console.log("分配角色.....");
  }
}

export { }