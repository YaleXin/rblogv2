/*
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
 */
export const state = () => ({
  // 管理员信息
  user: {
    id: -1,
    avatar: '',
    email: '',
    nickname: '管理员',
    username: '',
  }
})
// 修改state里面的函数必须用到mutations里面的函数
export const mutations = {
  saveUser (state, user)  {
    state.user = user
  },
  removeUser (state)  {
    state.user = {
      id: -1,
      avatar: '',
      email: '',
      nickname: '管里员',
      username: '',
    }
  }
}
// export const getters = {
//   user: (state) => {
//     return state.user;
//   }
// }