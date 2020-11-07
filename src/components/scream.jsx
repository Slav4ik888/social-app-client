import React, { Component } from 'react';
import Link from 'react-router-dom/Link';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import pt from 'prop-types';
// Redux stuff
import {connect} from 'react-redux';
import {likeScream, unlikeScream} from '../redux/actions/data-actions';
// MUI Stuff
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
// Icons
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
// Components
import MyButton from './button/button';

const styles = {
  card: {
    display: `flex`,
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: `cover`,
  }
}

class Scream extends Component {
  constructor(props) {
    super(props);
    this.isLikedScream = this.isLikedScream.bind(this);
    this.likeScream = this.likeScream.bind(this);
    this.unlikeScream = this.unlikeScream.bind(this);
  }
  isLikedScream() {
    if (this.props.user.likes &&
      this.props.user.likes.find(like => like.screamId === this.props.scream.screamId)) {
      console.log(`like.screamId: ${this.props.scream.screamId}`, true);
      return true;
    } else {
      console.log(`like.screamId: ${this.props.scream.screamId}`, false);
      return false;
    }
  }
  likeScream() {
    this.props.likeScream(this.props.scream.screamId);
  }
  unlikeScream() {
    this.props.unlikeScream(this.props.scream.screamId);
  }
  
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      scream: {
        body, createdAt, imageUrl, userHandle, likeCount, commentCount
      },
      user: {authenticated}
    } = this.props;

    const likeButton = !authenticated ? (
      <MyButton title="Чтобы поставить Like войдите в свой аккаунт" className="button" placement={"top"}>
        <Link to="/login">
          <FavoriteBorder color="primary  "/>
        </Link>
      </MyButton>
    ) : (
        this.isLikedScream() ? (
          <MyButton title="Отменить Like" onClick={this.unlikeScream} className="button" placement={"top"}>
            <FavoriteIcon color="primary" />
          </MyButton>
         ) : (
            <MyButton title="Поставить Like" onClick={this.likeScream} className="button" placement={"top"}>
              <FavoriteBorder color="primary" />
            </MyButton>
        ) 
    )
    return (
      <Card className={classes.card}>
        <CardMedia
          image={imageUrl}
          title="Profile image"
          className={classes.image}
        />
        <CardContent class={classes.content}>
          <Typography
            variant="h5"
            component={Link}
            to={`/users/${userHandle}`}
            color="primary"
          >
            {userHandle}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{body}</Typography>

          {likeButton}
          <span>{likeCount} Likes</span>
          <MyButton title="Написать комментарий" onClick={this.handleEditPicture} className="button" placement={"top"}>
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} Комментариев</span>
        </CardContent>
      </Card>
    )
  }
}

Scream.propTypes = {
  likeScream: pt.func.isRequired,
  unlikeScream: pt.func.isRequired,
  user: pt.object.isRequired,
  scream: pt.object.isRequired,
  classes: pt.object.isRequired,
}
const mapStateToProps = (state) => ({
  user: state.user,
})

export default connect(mapStateToProps, {likeScream, unlikeScream})(withStyles(styles)(Scream));
