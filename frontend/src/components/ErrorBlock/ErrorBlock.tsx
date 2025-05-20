import styles from "./ErrorBlock.module.scss"
import { useAppSelector } from "../../app/store"

export default function ErrorBlock(){

    const errorAuth = useAppSelector(state=> state.auth.isError)//    достаю индикаторы ошибок
    const errorEvent = useAppSelector(state=> state.event.isError)//    достаю индикаторы ошибок
    const errorMessageAuth = useAppSelector(state=> state.auth.errorMessage)//  достаю сообщение об ошибке
    const errorMessageEvent = useAppSelector(state=> state.event.errorMessage)//  достаю сообщение об ошибке

    let error: boolean = false
    let errorMessage: string = ""
    if(errorAuth || errorEvent){//  делаю из них 1 индикатор
        error = true
        if(errorMessageAuth != ""){
            errorMessage = errorMessageAuth
        }else{
            errorMessage = errorMessageEvent
        }
        
    }

    return(
        <>
        {error? <div className={styles.errorDiv}>
            <div>
                <p>ошибка{errorMessage}</p>
            </div>
            
        </div> : <></>}
        
        </>
    )
}