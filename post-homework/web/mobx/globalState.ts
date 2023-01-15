import { makeAutoObservable } from "mobx"
import { UserType } from "../components/post-cards/post-cards.component.types"

export class GlobalState {
    isOpenModal = false
    refreshPosts = false
    loggedUser: UserType | undefined

    constructor() {
        makeAutoObservable(this)
    }

    setIsOpenModal(value: boolean){
        this.isOpenModal = value
    }

    setRefreshPosts(value: boolean){
        this.refreshPosts = value
    }

    setLoggedUser(value: any) {
        this.loggedUser = value
    }
}