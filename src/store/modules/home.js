import mockRequest from "@/utils/mockRequest"
export default {
    actions: {
        //获取首页mock数据
        // async getData({ commit }) {
        //     const result = await mockRequest.get("/home/list")
        //     if (result.code == 20000) {
        //         commit('GETDATA', result.data)
        //     }
        // }
    },
    mutations: {
        GETDATA(state, list) {
            state.list = list
        }
    },
    state: {
        list: {}
    },
    getters: {}
}