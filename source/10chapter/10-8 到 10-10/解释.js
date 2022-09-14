
function Customer () {
  this.custname = "王五"
}

Customer.prototype.buy = function (things) {
  console.log(this.custname, " 购买：");
  console.log(things)
}


class StringUtil {//工具类
  static trimSpace (str) {
    return str.replace(/\s+/g, "")
  }
}

let dataprops = Object.getOwnPropertyDescriptor(Customer.prototype, "buy")
let dataprops2 = Object.getOwnPropertyDescriptor(Customer.prototype, "buy")
console.log(dataprops === dataprops2)//false
let datapropsmethod = dataprops.value
dataprops.value = function (...args) {
  args = args.map((arg) => {
    if (typeof arg === "string") {
      return StringUtil.trimSpace(arg)
    }
    return arg;
  })
  console.log("拦截方法的前置功能输出args:", args);//前置拦截
  datapropsmethod.call(this, args)//执行原来的目标类中的方法DistribRoles
  console.log("拦截方法的后置拦截输出...");//前置拦截
}
Object.defineProperty(Customer.prototype, "buy", dataprops);

let cust = new Customer();
cust.buy("buydfd");
