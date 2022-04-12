const errorHandlers = new Map();
export default (res, vm) => {
  if(errorHandlers.has(res.code)){
    let handler = errorHandlers.get(res.code)
    handler(res,vm)
  }else{
    null;
  }
};

const unAuthorizedErrorHandler = function(res, vm) {
  vm.$router.push("/");
};
errorHandlers.set(401,unAuthorizedErrorHandler);