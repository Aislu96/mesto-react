import React from "react";

function Card(props) {

    function handleClick() {
        props.onCardClick(props.card);
    }
    return (
        <article className="element">
            <img src={props.link} alt={props.name} className="element__image" onClick={handleClick}/>
            <button type="button" className="element__delete" aria-label="Урна"/>
            <div className="element__group">
                <h2 className="element__text">{props.name}</h2>
                <div className="element__group_cards">
                    <button type="button" className="element__button" aria-label="Лайк"/>
                    <p className="element__number">{props.likes}</p>
                </div>
            </div>
        </article>
    );
}

export default Card;