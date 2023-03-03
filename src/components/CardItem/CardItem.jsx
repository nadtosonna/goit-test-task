import css from './CardItem.module.css';
import logo from '../../images/logo.png';

const CardItem = ({ id, avatar, name, tweets, followers, follow, toggleFollow }) => {

  const toggleFollowStatus = () => {
    toggleFollow(id);
  };
  const followersUI = () => {
    return followers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <li className={css.card}>
      <img src={logo} alt="logo" className={css.logo} />
      <div className={css.imgBlock}></div>
      <div className={css.avatarBlock}>
        <div className={css.line}></div>
        <div className={css.circle}>
          <img
          src={avatar}
          alt="User avatar"
          className={css.avatar}
        />
        </div>
      </div>
      <ul className={css.info}>
        <li className={css.stats}>{name}</li>
        <li className={css.stats}>{tweets} {tweets.toString().endsWith('1') ? 'tweet' : 'tweets'}</li>
        <li className={css.stats}>{followersUI()} {followers.toString().endsWith('1') ? 'follower' : 'followers'}</li>
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