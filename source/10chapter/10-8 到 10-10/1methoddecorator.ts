// 不带参数的方法装饰器
/**
 * 
 * @param targetClassPrototype [RoleService.prototype]
 * @param methodname 
 * @param methodDecri 
 */
function MyMethodDecorator(targetClassPrototype: any, methodname: string,
  methodDecri: PropertyDescriptor) {// 数据属性
  console.log("targetClassPrototype:", targetClassPrototype)// RoleService { DistribRoles: [Function] }
  console.log("key:", methodname);// DistribRoles
  console.log("数据属性:", methodDecri)
  methodDecri.value();// 执行被装饰器修饰的方法【输出分配角色.....】
}


// 目标类
class RoleService {
  public roleName: string = "管理员"
  constructor() {
  }

  @MyMethodDecorator
  DistribRoles() {// 分配角色
    console.log("分配角色.....");
  }
}