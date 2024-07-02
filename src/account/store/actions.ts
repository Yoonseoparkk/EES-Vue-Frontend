import { ActionContext, Commit } from "vuex"
import { Account, AccountState } from "./states"
import { AxiosResponse } from "axios"
import axiosInst from "@/utility/axiosInstance"

export type AccountActions = {
    requestEmailDuplicationCheckToDjango(context: ActionContext<AccountState, any>, email: string): Promise<boolean>
    requestNicknameDuplicationCheckToDjango(context: ActionContext<AccountState, any>, payload: any): Promise<boolean>
    requestCreateNewAccountToDjango(context: ActionContext<AccountState, any>, accountInfo: { email: string, nickname: string }): Promise<void>
    requestNicknameToDjango(context: ActionContext<AccountState, any>,email: string): Promise<Account>
}

const actions: AccountActions = {
    async requestEmailDuplicationCheckToDjango(context: ActionContext<AccountState, any>, email: string): Promise<boolean> {
        const response = await axiosInst.djangoAxiosInst.post(
            '/account/email-duplication-check', { email })
        return response.data.isDuplicate
    },
    async requestNicknameDuplicationCheckToDjango(context: ActionContext<AccountState, any>, payload: any): Promise<boolean> {
        const { newNickname } = payload

        return axiosInst.djangoAxiosInst.post(
            '/account/nickname-duplication-check',
            { newNickname: newNickname }
        )
            .then((res) => {
                if (res.data) {
                    alert('사용 가능한 닉네임입니다.')
                    return false
                } else {
                    alert('중복된 닉네임입니다.')
                    return true
                }
            })
    },
    async requestCreateNewAccountToDjango(context: ActionContext<AccountState, any>,
        accountInfo: { email: string, nickname: string }): Promise<void> {
        try {
            alert('신규 계정이 생성되었습니다!')
            await axiosInst.djangoAxiosInst.post('/account/register', accountInfo)
        } catch (error) {
            console.error('신규 계정 생성 실패:', error)
            throw error
        }
    },
    async requestNicknameToDjango(context: ActionContext<AccountState, any>, email: string): Promise<Account> {
        try {
            const userToken = localStorage.getItem("userToken");
            const res: AxiosResponse<Account> = 
            await axiosInst.djangoAxiosInst.post('/account/nickname',  { userToken: userToken } );
            console.log('data:', res.data)
            context.commit('REQUEST_NICKNAME_TO_DJANGO', res.data);
            return res.data
        } catch (error) {
            console.error('requestNicknameToDjango() 문제 발생:', error);
            throw error
        }
    },
};

export default actions;