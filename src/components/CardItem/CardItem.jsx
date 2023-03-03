import css from './CardItem.module.css';
import logo from '../../images/logo.png';

const CardItem = ({ id, avatar, name, tweets, followers, follow, toggleFollow }) => {

const toggleFollowStatus = () => {toggleFollow(id)};

  return (
    <li className={css.card}>
      <img src={logo} alt="logo" className={css.logo} />
      <div className={css.imgBlock}></div>
      <div className={css.description}>
        <img
          src={avatar}
          alt="User avatar"
          className={css.avatar}
        />
      </div>
      <ul className={css.info}>
        <li className={css.stats}>{name}</li>
        <li className={css.stats}>{tweets} tweets</li>
        <li className={css.stats}>{followers} followers</li>
      </ul>
      <button
        className={follow ? `${css.buttonActive}` : `${css.button}`}
        onClick={() => { toggleFollowStatus() }}>
        {!follow ? "Follow" : "Following"}
      </button>
    </li>
  );
};

export default CardItem;