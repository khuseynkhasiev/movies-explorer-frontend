import './InfoTooltip.css';
export default function InfoTooltip(props) {
    const {
        infoToolTip,
        onClose,
        patchUserIsError,
    } = props
    return (<div className={`info-tooltip ${infoToolTip ? "info-tooltip_opened" : null} `}>
                <div className="info-tooltip__container">
                    <button className="info-tooltip__close" type="button" aria-label="кнопка закрытия" onClick={onClose}></button>
                    <div className={`${!patchUserIsError ? "info-tooltip__img" : "info-tooltip__img-error"}`}></div>
                    <p className="info-tooltip__text">
                        {!patchUserIsError ? "Информация успешно обновлена" : "Что-то пошло не так! Попробуйте ещё раз"}!
                    </p>
                </div>
            )
        }
    </div>)
/*    return (<div className={`info-tooltip ${infoToolTip ? "info-tooltip_opened" : null} `}>
        <div className="info-tooltip__container">
            <button className="info-tooltip__close" type="button" aria-label="кнопка закрытия" onClick={onClose}></button>
            <div className={`${infoToolTip ? "info-tooltip__img" : "info-tooltip__img-error"}`}></div>
            <p className="info-tooltip__text">
                {infoToolTip ? "Информация успешно обновлена" : "Что-то пошло не так! Попробуйте ещё раз"}!
            </p>
        </div>
    </div>)*/
}