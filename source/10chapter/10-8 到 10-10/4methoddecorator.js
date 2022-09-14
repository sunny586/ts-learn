"use strict";
// 1. 底层JS 组合装饰器和目标类 __decorate函数
var __decorate = (this && this.__decorate) || function (decorators, target,
  key, desc) {
  // argsnum 参数个数
  var argsnum = arguments.length;
  // targetinfo 被装饰器修饰的目标【本案例为类】
  // argsnum=2 装饰器修饰的是类或者构造器参数，targetinfo=target[类名]
  // argsnum=4 装饰器修饰的是方法【第四个参数desc等于null] targetinfo=该方法的数据属性【desc = Object.getOwnPropertyDescriptor(target, key) 】
  // argsnum=3 装饰器修饰的是方法参数或者属性,targetinfo=undefined
  var targetinfo = argsnum < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc;//S100
  console.log("1 targetinfo:", targetinfo);
  // decorator保存装饰器数组元素
  var decorator;
  // 元数据信息,支持reflect-metadata元数据
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") {
    targetinfo = Reflect.decorate(decorators, target, key, desc);
  } else
    //  装饰器循环,倒着循环,说明同一个目标上有多个装饰器，执行顺序是倒着执行
    for (var i = decorators.length - 1; i >= 0; i--) {
      if (decorator = decorators[i]) {
        // 如果参数小于3【decorator为类装饰器或者构造器参数装饰器】执行decorator(targetinfo)直接执行decorator装饰器，并传递目标targetinfo，这里是类
        // 如果参数大于3【decorator为方法装饰器】 直接执行 decorator(target, key, targetinfo) 
        // 如果参数等于3 【decorator为方法参数装饰器或者属性装饰器】 直接执行decorator(target, key)
        // targetinfo最终为各个装饰器执行后的返回值,但如果没有返回值,直接返回第S100行的targetinfo
        targetinfo = (argsnum < 3 ? decorator(targetinfo) : argsnum > 3 ?
          decorator(target, key, targetinfo) : decorator(target, key)) || targetinfo;

      }
    }
 return argsnum > 3 && targetinfo &&
    Object.defineProperty(target, key, targetinfo), targetinfo;
   //return targetinfo
}
// 增强目标类的方法功能
var StringUtil = /** @class */ (function () {
  function StringUtil () {
  }
  StringUtil.trimSpace = function (str) {
    return str.replace(/\s+/g, "");
  };
  return StringUtil;
}());
function MethodInterceptor (params) {
  return function (targetClassPrototype, methodname, dataprops) {
    var datapropsmethod = dataprops.value; //保存的时DistribRoles方法
    console.log("MethodInterceptor...");
    dataprops.value = function () {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      args = args.map(function (arg) {
        if (typeof arg === "string") {
          return StringUtil.trimSpace(arg);
        }
        return arg;
      });
      console.log("args:", args); //前置拦截
      datapropsmethod.call(this, args); //执行原来的目标类中的方法DistribRoles
      console.log("后置拦截..."); //前置拦截
    };
  };
}
// 方法装饰器实现拦截器前置、后置功能
var RoleService = /** @class */ (function () {
  function RoleService () {
    this.roleName = "管理员";
  }
  RoleService.prototype.DistribRoles = function (userName, isValid) {
    console.log("分配角色.....");
  };
  let methodResult = __decorate([
    MethodInterceptor("DistribRoles方法")
  ], RoleService.prototype, "DistribRoles", null);
  console.log("__decorate执行最后返回的结果:", methodResult);
  return RoleService;
}());
var roleService = new RoleService();
roleService.DistribRoles("张三", true);
