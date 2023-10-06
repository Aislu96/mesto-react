import React from "react";
import Card from "./Card";
import vector from "../images/Vector.svg"

function Main(props) {
    return (
        <main>
            <section className="profile">
                <div className="profile__container">
                    <img src={props.currentUser.avatar} alt="Жак-Ив Кусто на фоне моря смотрит в даль."
                         className="profile__avatar"/>
                    <div className="profile__overlay">
                        <img src={vector} onClick={props.onEditAvatar} className="profile__icon"
                             alt="Иконка для редактирования"/>
                    </div>
                </div>
                <div className="profile__info">
                    <h1 className="profile__title">{props.currentUser.name}</h1>
                    <button type="button" onClick={props.onEditProfile} className="profile__edit-button"
                            aria-label="Редактирование"></button>
                    <p className="profile__subtitle">{props.currentUser.about}</p>
                </div>
                <button type="button" onClick={props.onAddPlace} className="profile__add-button"
                        aria-label="Добавление"></button>
            </section>

            <section className="elements">
                {props.cards.map((card, id) => (
                    <Card
                        key={id}
                        card={card}
                        link={card.link}
                        name={card.name}
                        likes={card.likes.length}
                        onCardClick={props.onCardClick}
                    />
                ))}
            </section>
        </main>
    );
}

export default Main;