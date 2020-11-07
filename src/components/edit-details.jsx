import React, {Component} from 'react';
import pt from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
// Readux Stuff
import {connect} from 'react-redux';
import {editUserDetails} from '../redux/actions/user-actions';
// MUI Stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// Icons
import EditIcon from '@material-ui/icons/Edit';
// Component
import MyButton from './button/button';


const styles = {
  textField: {
    margin: `10px auto 10px auto`,
  },
  button: {
    marginTop: 30,
    position: `relative`,
    float: `right`,
  },
};

class EditDetails extends Component {
  constructor(props) {
    super(props);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.mapUserDetailsToState = this.mapUserDetailsToState.bind(this);
    this.state = {
      bio: ``,
      website: ``,
      location: ``,
      open: false,
    }
  }

  mapUserDetailsToState(credentials) {
    this.setState({
      bio: credentials.bio ? credentials.bio : ``,
      website: credentials.website ? credentials.website : ``,
      location: credentials.location ? credentials.location : ``,
    });
  }

  componentDidMount() {
    const {credentials} = this.props;
    this.mapUserDetailsToState(credentials);
  }

  handleOpen() {
    this.setState({ open: true });
    this.mapUserDetailsToState(this.props.credentials);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleSubmit() {
    const userDetails = {
      bio: this.state.bio,
      website: this.state.website,
      location: this.state.location,
    };
    this.props.editUserDetails(userDetails);
    this.handleClose();
  }

  render() {
    const {classes} = this.props;
    
    return (
      <>
        <MyButton title="Изменить" onClick={this.handleOpen} className={classes.button} placement={"top"}>
          <EditIcon color="primary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Внесите изменения</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name="bio"
                type="text"
                label="Bio"
                multiline
                rows="3"
                placeholder="Расскажите кратко о себе"
                className={classes.textField}
                value={this.state.bio}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="website"
                type="text"
                label="Website"
                placeholder="Ваш вебсайт"
                className={classes.textField}
                value={this.state.website}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="location"
                type="text"
                label="Location"
                placeholder="Откуда вы"
                className={classes.textField}
                value={this.state.location}
                onChange={this.handleChange}
                fullWidth
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              Отмена
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Сохранить
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

EditDetails.propTypes = {
  editUserDetails: pt.func.isRequired,
  classes: pt.object.isRequired,
  credentials: pt.object.isRequired,
};

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
});

export default connect(mapStateToProps, {editUserDetails})(withStyles(styles)(EditDetails));
