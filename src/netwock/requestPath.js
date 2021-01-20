import request from '@/netwock/request'    

export default {
  getAllUser() {
    return request.get("/userInfo/query");
  },  

 /*  addUser({username,noteInfo}) {
    return request.post("/userInfo/add")
  },
   */
}