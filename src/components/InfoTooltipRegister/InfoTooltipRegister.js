import './InfoTooltipRegister.css';
import {useEffect, useState} from "react";
import {
    ConflictErrorCode,
    ConflictErrorMessage,
} from "../../constants";
export default function InfoTooltipRegister(props) {
    const {
        infoTooltipRegister,
        onClose,
        infoTooltipRegisterError
    } = props

    const [errorMessage, setErrorMessage] = useState('На сервере произошла ошибка');
    useEffect(() => {
        handleInfoTooltipRegister()
    });
    function handleInfoTooltipRegister(){
        if(infoTooltipRegisterError === ConflictErrorCode){
            setErrorMessage(ConflictErrorMessage)
        }
    }
    return (<div className={`info-tooltip ${infoTooltipRegister ? "info-tooltip_opened" : null} `}>
                <div className="info-tooltip__container">
                    <button className="info-tooltip__close" type="button" aria-label="кнопка закрытия" onClick={onClose}></button>
                    <div className={`info-tooltip__img-error`}></div>
                    <p className="info-tooltip__text">
                        {errorMessage}
                    </p>
                </div>
            )
        }
    </div>)
}