import React, {Component} from 'react';
import pt from 'prop-types';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import withStyles from '@material-ui/core/styles/withStyles';
// Readux Stuff
import {connect} from 'react-redux';
import {uploadImage, logoutUser} from '../redux/actions/user-actions';
// MUI Stuff
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
// Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
// Component
import EditDetails from './edit-details';

// const styles = (theme) => ({
//   ...theme
// });
const styles = {
  paper: {
    padding: 20
  },
  profile: {
    '& .image-wrapper': {
      "textAlign": `center`,
      "position": `relative`,
      '& button': {
        position: `absolute`,
        top: `80%`,
        left: `70%`
      }
    },
    '& .profile-image': {
      width: 150,
      height: 150,
      objectFit: `cover`,
      maxWidth: `100%`,
      borderRadius: `50%`
    },
    '& .profile-details': {
      "textAlign": `center`,
      '& span, svg': {
        verticalAlign: `middle`
      },
      '& a': {
        color: `#00bcd4`
      }
    },
    '& hr': {
      border: `none`,
      margin: `0 0 10px 0`
    },
    '& svg.button': {
      '&:hover': {
        cursor: `pointer`
      }
    }
  },
  buttons: {
    "textAlign": `center`,
    '& a': {
      margin: `20px 10px`
    }
  }
};

class Profile extends Component {
  constructor(props) {
    super(props);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleEditPicture = this.handleEditPicture.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleImageChange(e) {
    const image = e.target.files[0];
    console.log(`image: `, image);
    const formData = new FormData();
    formData.append(`image`, e.target.files[0], e.target.files[0].name);

    console.log(`formData: `, formData);
    this.props.uploadImage(formData);
  }

  handleEditPicture() {
    const fileInput = document.getElementById(`imageInput`);
    fileInput.click();
  }

  handleLogout() {
    this.props.logoutUser();
  }
  render() {
    const {classes,
      user: {
        credentials: {handle, createdAt, imageUrl, bio, website, location},
        loading,
        authenticated,
      }} = this.props;
    if (loading) {
      return <p>Загружается...</p>;
    }

    if (authenticated) {
      return (
        <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className="image-wrapper">
              <img src={imageUrl} alt="profile" className="profile-image" />
              <input
                type="file"
                id="imageInput"
                hidden="hidden"
                onChange={this.handleImageChange}
              />
              <Tooltip title="Обновить аватарку" placement="top" arrow>
                <IconButton onClick={this.handleEditPicture} className="button">
                  <EditIcon color="primary" />
                </IconButton>
              </Tooltip>
            </div>
            <hr />
            <div className="profile-details">
              <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5">
                @{handle}
              </MuiLink>
              <hr />

              {bio &&
                <>
                  <Typography variant="body2">{bio}</Typography>
                  <hr />
                </>
              }
              {location && (
                <>
                  <LocationOn color="primary" /><span>{location}</span>
                  <hr />
                </>
              )}
              {website &&
                <>
                  <LinkIcon color="primary" />
                  <a href={website} target="_blank" rel="noopener noreferrer">
                    {` `}{website}
                  </a>
                  <hr />
                </>
              }
              <CalendarToday color="primary" />{` `}  <span>Joined {dayjs(createdAt).format(`MMM YYYY`)}</span>
            </div>
            <Tooltip title="Выйти из аккаунта" placement="top" arrow>
              <IconButton onClick={this.handleLogout}>
                <KeyboardReturn color="primary" />
              </IconButton>
            </Tooltip>
            <EditDetails />
          </div>
        </Paper>
      );
    } else {
      return (
        <Paper className={classes.paper}>
          <Typography variant="body2" align="center">
            Профиль не найден, пожалуйста войдите снова
            <div className={classes.buttons}>
              <Button variant="contained" color="primary" component={Link} to="/login">
                Войти в аккаунт
              </Button>
              <Button variant="contained" color="secondary" component={Link} to="/signup">
                Зарегистрироваться
              </Button>
            </div>
          </Typography>
        </Paper>
      );
    }
  }
}

Profile.propTypes = {
  user: pt.object.isRequired,
  classes: pt.object.isRequired,
  uploadImage: pt.func.isRequired,
  logoutUser: pt.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});
const mapActionsToProps = ({uploadImage, logoutUser});

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile));
