import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import DocumentMeta from 'react-document-meta';
import * as authActions from 'redux/modules/auth';
import Firebase from 'firebase';


@connect(
  state => ({user: state.auth.user, fireName: state.fireName}),
  authActions
)

export default class Login extends Component {
  static propTypes = {
    fireName: PropTypes.object,
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func
  }

  getInitialState() {
    return {
      fireName: null
    }
  }

  componentDidMount() {
    this.personRef = new Firebase('https://torrid-heat-7637.firebaseio.com/people');
    this.personRef.on('child_added', function(data) {
      // do some stuff once
      const person = data.val();
      this.setState({
        fireName: person
      });
      console.log(person);
    }.bind(this));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const input = this.refs.username;
    this.props.login(input.value);
    input.value = '';
  }

  render() {
    const {fireName, user, logout} = this.props;
    const styles = require('./Login.scss');
    return (
      <div className={styles.loginPage + ' container'}>
        <DocumentMeta title="React Redux Example: Login"/>
        <h1>Login...</h1>
        <h2>{fireName}</h2>
        {!user &&
        <div>
          <form className="login-form form-inline" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input type="text" ref="username" placeholder="Enter a username" className="form-control"/>
            </div>
            <button className="btn btn-success" onClick={this.handleSubmit}><i className="fa fa-sign-in"/>{' '}Log In
            </button>
          </form>
          <p>This will "log you in" as this user, storing the username in the session of the API server.</p>
        </div>
        }
        {user &&
        <div>
          <p>You are currently logged in as {user.name}.</p>
          <div>
            <button className="btn btn-danger" onClick={logout}><i className="fa fa-sign-out"/>{' '}Log Out</button>
          </div>
        </div>
        }
      </div>
    );
  }
}
