import React from "react";

function PopupWithForm(props) {
    return (
        <>
            <div className={`popup popup_${props.name} ${props.isOpen ? `popup_opened` : ""}`}
                 onClick={props.onClickOverlay}>
                <div className="popup__body">
                    <button type="button" className="popup__close" aria-label="Закрыть"
                            onClick={props.onClose}/>
                    <form className="popup__container" name={props.form} noValidate>
                        <h3 className="popup__title">{props.title}</h3>
                        {props.children}
                        <button type="submit" className="popup__button popup__button_type_text"
                                aria-label={props.buttonTitle}>
                            {props.buttonTitle}
                            </button>
                    </form>
                </div>
            </div>

            <div className="popup popup_delete_card">
                <div className="popup__body">
                    <button type="button" className="popup__close popup__close_delete" aria-label="Закрыть"/>
                    <form className="popup__container" name="popupDelete" noValidate>
                        <h3 className="popup__title">Вы уверены?</h3>
                        <button type="submit" className="popup__button popup__button_type_text popup__button_delete"
                                aria-label="Да"/>Да
                    </form>
                </div>
            </div>
        </>
    )
}

export default PopupWithForm;