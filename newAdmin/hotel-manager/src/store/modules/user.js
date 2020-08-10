import {login} from '@/api/user'
import { getData } from '@/api/common'
import {
    setToken, getToken,setCompany,getCompany
} from "@/libs/util";

export default {
    state: {
        token: getToken(),
        company:getCompany(),
        userName: '',
        system: '',
        user: {},
        dept: '',
        role: '',
        roles: ''
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
            setToken(token);
        },
        setCompany(state, company) {
            state.company = company;
            setCompany(company);
        },
        setSystem(state, system) {
            state.system = system;
        },
        setUser(state, user) {
            state.user = user;
        },
        setDept(state, dept) {
            state.dept = dept;
        },
        setRole(state, role) {
            state.role = role;
        },
        setRoles(state, roles) {
            state.roles = roles;
        },
        setUserName(state, userName) {
            state.userName = userName;
        },
    },
    actions: {
        handleLogin({commit}, data) {
            return new Promise((resolve, reject) => {
                login(data).then(res => {
                    const data = res.data;
                    data && data.name && commit('setToken', data.name);
                    data && data.user && data.user.name && commit('setUserName', data.user.name);
                    data && data.user && commit('setUser',data.user);
                    data && data.system && commit('setSystem', JSON.stringify(data.system));
                    data && data.dept && commit('setDept', data.dept);
                    data && data.roles && commit('setRoles', JSON.stringify(data.role));
                    data && data.role && commit('setRole', data.role);
                    //data && data.name && commit('setToken', "test_123");

                    //获取companyCode
                    getData({
                        name: 'm_getCouponLoginInfo__get',
                        data: {},
                        type: ''
                      }).then(res => {
                        const result = res.data;
                        result && commit('setCompany', result);
                        resolve(data)
                      })
                }).catch(err => {
                    reject(err)
                })
            })
        },
        handleLogOut({state, commit, rootState}) {
            return new Promise((resolve, reject) => {
                commit('setToken', '');
                commit('setTagList', {});
                window.localStorage.clear();
                resolve()
            })
        },
    }
}
