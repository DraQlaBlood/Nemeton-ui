import { observable, action } from "mobx";
import Api from "../../lib/helpers/api/index";
import history from "../../history";

class User {
  sessions = "/sessions";
  @observable isLoading = false;
  @observable signedIn = false;
  @observable email = null;

  @action setIsLoading(status) {
    this.isLoading = status;
  }

  @action setSignedIn(status, email) {
    this.signedIn = status;
    if (status && email) {
      this.email = email;
    }
  }

  //For landing page
  signInWithoutResources(email = null, password = null) {
    const store = {
      authentication_token: localStorage.getItem("token"),
      email: localStorage.getItem("email")
    };
    if (store.email && store.authentication_token) {
      this.signInFromStorageWithoutResources(store.email);
    } else if (email && password) {
      this.createSession(email, password);
    }
  }

  @action async signInFromStorageWithoutResources(email) {
    const response = await Api.get(this.sessions);
    const status = await response.status;

    if (status === 200) {
      this.email = email;
      this.signedIn = true;
      this.isLoading = false;
      history.push("/welcome");
    } else {
      this.signOut();
    }
  }
  //end for landing

  signIn(email = null, password = null) {
    const store = {
      authentication_token: localStorage.getItem("token"),
      email: localStorage.getItem("email")
    };
    if (store.email && store.authentication_token) {
      this.signInFromStorage(store.email);
    } else if (email && password) {
      this.createSession(email, password);
    } else {
      this.signOut();
    }
  }

  @action async signInFromStorage(email) {
    const response = await Api.get(this.sessions);
    const status = await response.status;

    if (status === 200) {
      this.email = email;
      this.signedIn = true;
      this.isLoading = false;
      //history.push("/welcome");
    } else {
      this.signOut();
    }
  }

  async createSession(email, password) {
    this.setIsLoading(true);
    const response = await Api.post(this.sessions, { email, password });

    const status = await response.status;

    if (status === 201) {
      const body = await response.json();
      const { user } = body.data;

      localStorage.setItem("token", user.authentication_token);
      localStorage.setItem("email", user.email);

      this.setIsLoading(false);
      this.setSignedIn(true, user.email);

      history.push("/welcome");
    } else {
      console.log("error");
    }
  }

  async destroySession() {
    this.setIsLoading(true);
    const response = await Api.delete(this.sessions);
    const status = await response.status;

    if (status === 200) {
      this.setIsLoading(false);
      this.signOut();
    }
  }

  @action signOut() {
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    this.email = null;
    this.signedIn = false;
    this.isLoading = false;
    history.push("/users/new-user-session");
  }
}
export default new User();
