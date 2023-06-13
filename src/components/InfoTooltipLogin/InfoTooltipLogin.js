import './InfoTooltipLogin.css';
import {useEffect, useState} from "react";
import {
    UnauthorizedErrorCode, UnauthorizedErrorMessage,
} from "../../constants";
export default function InfoTooltipLogin(props) {
    const {
        infoTooltipLogin,
        onClose,
        infoTooltipLoginError
    } = props

    const [errorMessage, setErrorMessage] = useState('На сервере произошла ошибка');
    useEffect(() => {
        handleInfoTooltipRegister()
    });
    function handleInfoTooltipRegister(){
        if(infoTooltipLoginError === UnauthorizedErrorCode){
            setErrorMessage(UnauthorizedErrorMessage)
        }
    }
    return (<div className={`info-tooltip ${infoTooltipLogin ? "info-tooltip_opened" : null} `}>
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