import { makeAutoObservable } from "mobx"

export class GlobalState {
    isOpenModal = false

    constructor() {
        makeAutoObservable(this)
    }

    setIsOpenModal(value: boolean){
        this.isOpenModal = value
    }
}