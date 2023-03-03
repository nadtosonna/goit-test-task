import { useEffect, useState } from 'react';
import CardItem from 'components/CardItem/CardItem';
import css from './CardList.module.css';
import users from '../../data/users.json';

const CardList = () => {

    const [cards, setCards] = useState(() => {
        const saved = localStorage.getItem("cards");
        if (saved) {
            const initialValue = JSON.parse(saved);
            return initialValue;
        } else return users;
    });

    const toggleFollow = (id) => {
        setCards(cards.map(card => {
            if (id === card.id) {
                if (card.follow === false) {
                    return {
                    ...card,
                    follow: !card.follow,
                    followers: card.followers + 1
                    }
                } else return {
                    ...card,
                    follow: !card.follow,
                    followers: card.followers - 1
                } 
            } else {
                return card;
            };
        }))
    }

    useEffect(() => {
        localStorage.setItem("cards", JSON.stringify(cards));
    }, [cards]);
    
    return (
        <section className={css.section}>
            <ul className={css.list}>
                {cards.map(card => {
                    return (
                        <CardItem
                            key={card.id}
                            id={card.id}
                            avatar={card.avatar}
                            name={card.name}
                            tweets={card.tweets}
                            followers={card.followers}
                            follow={card.follow}
                            toggleFollow={toggleFollow} />
                    )
                })}
            </ul>
        </section>
    );
}

export default CardList;