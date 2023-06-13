import './InfoTooltipMovies.css';
import {useEffect, useState} from "react";
import {
    ConflictErrorCode,
    ConflictErrorMessage,
} from "../../constants";
export default function InfoTooltipMovies(props) {
    const {
        infoTooltipMovies,
        onClose,
    } = props

    const [errorMessage, setErrorMessage] = useState('На сервере произошла ошибка');

    return (<div className={`info-tooltip ${infoTooltipMovies ? "info-tooltip_opened" : null} `}>
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