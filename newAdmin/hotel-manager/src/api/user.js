import {
    getData
} from '@/api/common'

export const getVerifycode = (data) => {
    return getData({
        name: "r_verifycode_get",
        data: data
    })
};

export const login = (data) => {
    return getData({
        name: "r_login3_POST",
        data: data
    })
};


