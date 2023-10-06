import React, {useEffect, useState} from "react";
import api from "../utils/api.js";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
    const [isPopupOpen, setIsPopupOpen] = useState({isOpen: false});
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);


    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handelOverlayClose(evt) {
        if (evt.target.classList.contains('popup')) {
            closeAllPopups();
        }
    }

    useEffect(() => {
        if (isPopupOpen) {
            function handleEscClose(evt) {
                if (evt.key === "Escape") {
                    closeAllPopups();
                }
            }

            document.addEventListener('keydown', handleEscClose);

            return () => {
                document.removeEventListener('keydown', handleEscClose);
            }
        }
    })

    useEffect(() => {
        Promise.all([api.getCards(), api.getUser()])
            .then(([cards, user]) => {
                setCurrentUser(user);
                setCards(cards);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    function closeAllPopups() {
        isPopupOpen.isOpen = false;
        setIsPopupOpen({...isPopupOpen});
        setSelectedCard(null);
    }

    function handelEditProfileClick() {
        isPopupOpen.isOpen = true;
        setIsPopupOpen({
            ...isPopupOpen,
            name: "edit_profile",
            title: "Редактировать профиль",
            form: "popupForm",
            buttonTitle: "Сохранить",
            children:
                <> <input name="input-name" className="popup__input popup__input_type_name" type="text"
                          placeholder="Имя"
                          minLength="2" maxLength="40" required/>
                    <span id="input-name-error" className="popup__input-error"></span>
                    <input name="input-job" className="popup__input popup__input_type_job" type="text"
                           placeholder="О себе"
                           minLength="2" maxLength="200" required/>
                    <span id="input-job-error" className="popup__input-error"></span>
                </>
        })
    }

    function handelAddPlaceClick() {
        isPopupOpen.isOpen = true;
        setIsPopupOpen({
            ...isPopupOpen,
            name: "add_place",
            title: "Новое место",
            form: "form-info",
            buttonTitle: "Создать",
            children:
                <>
                    <input name="input-username" className="popup__input popup__input_type_title" type="text"
                           placeholder="Название"
                           minLength="2" maxLength="30" required/>
                    <span id="input-username-error" className="popup__input-error"></span>
                    <input name="input-url" className="popup__input popup__input_type_link" type="url"
                           placeholder="Ссылка на картинку" required/>
                    <span id="input-url-error" className="popup__input-error"></span>
                </>
        })
    }

    function handelEditAvatarClick() {
        isPopupOpen.isOpen = true;
        setIsPopupOpen({
            ...isPopupOpen,
            name: "edit_avatar",
            title: "Обновить аватар",
            form: "info-avatar",
            buttonTitle: "Сохранить",
            children:
                <>
                    <input name="input-url-avatar" className="popup__input popup__input_type_avatar" type="url"
                           placeholder="Ссылка на аватар" required/>
                    <span id="input-url-avatar-error" className="popup__input-error"></span>
                </>
        })
    }


    return (
        <div className="App">
            <Header/>
            <Main
                onEditProfile={handelEditProfileClick}
                onAddPlace={handelAddPlaceClick}
                onEditAvatar={handelEditAvatarClick}
                currentUser={currentUser}
                cards={cards}
                onCardClick={handleCardClick}
            />
            <Footer/>
            <PopupWithForm isOpen={isPopupOpen.isOpen} name={isPopupOpen.name} title={isPopupOpen.title}
                           form={isPopupOpen.form} buttonTitle={isPopupOpen.buttonTitle}
                           children={isPopupOpen.children} onClose={closeAllPopups}
                           onClickOverlay={handelOverlayClose}/>
            <ImagePopup card={selectedCard} onClose={closeAllPopups} onClickOverlay={handelOverlayClose}/>
        </div>
    );
}

export default App;
