import { makeAutoObservable } from "mobx"

export class GlobalState {
    isOpenModal = false
    refreshPosts = false

    constructor() {
        makeAutoObservable(this)
    }

    setIsOpenModal(value: boolean){
        this.isOpenModal = value
    }

    setRefreshPosts(value: boolean){
        this.refreshPosts = value
    }
}