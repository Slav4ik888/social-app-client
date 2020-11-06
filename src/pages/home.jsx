import React, {Component} from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';

import Scream from '../components/scream';
import Profile from '../components/profile';

axios.defaults.baseURL =
  `https://europe-west1-socialapp-103bb.cloudfunctions.net/api`;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screams: null
    };
  }

  componentDidMount() {
    return axios.get(`/screams`)
      .then((res) => {
        console.log(`res: `, res.data);

        this.setState({
          screams: res.data
        });
      })
      .catch((err) => console.log(`err: `, err));
  }

  render() {
    let recentScreamsMarkup = this.state.screams ? (
      this.state.screams.map((scream) => (
        <Scream key={scream.screamId} scream={scream} />
      ))
    ) : <p>Loading...</p>;
    return (
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          {recentScreamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

export default Home;
