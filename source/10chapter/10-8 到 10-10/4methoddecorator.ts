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
    console.log("进入MethodInterceptor");

    dataprops.value = function (...args: any) {
      args = args.map((arg: any) => {
        if (typeof arg === "string") {
          return StringUtil.trimSpace(arg)
        }
        return arg;
      })
      console.log("args:", args);//前置拦截
      datapropsmethod.call(this, args)//执行原来的目标类中的方法DistribRoles
      console.log("后置拦截...");//前置拦截
    }
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

// let roleService = new RoleService();
// roleService.DistribRoles("张三", true);

export { }