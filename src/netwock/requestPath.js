import request from '@/netwock/request'

export default {
  getAllUser() {
    return request.get("/userInfo/query");
  },

  addUser({ username, noteInfo }) {
    return request.post("/userInfo/add", {
      username,
      noteInfo,
    })
  },

  deleteById(id) {
    return request.delete("/userInfo/delete", {
      params: {
        id,
      }
    });
  },
  updateById({ id, username, noteInfo }) {
    return request.put("/userInfo/update", {
      id,
      username,
      noteInfo,
    });
  },
}