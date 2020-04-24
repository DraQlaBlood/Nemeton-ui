import { observable, action } from "mobx";
import Api from "../../lib/helpers/api/index";
import history from "../../history";

class User {
  sessions = "/sessions";
  users = "/users";

  @observable isSingningIn = false;
  @observable isLoading = false;
  @observable signedIn = false;
  @observable email = null;
  @observable account_id = null;
  
  @observable currentlatitude = null;
  @observable currentlongitude = null;
  

  @action setIsLoading(status) {
    this.isLoading = status;
  }

  @action setIsSingningIn(status) {
    this.isSingningIn = status;
  }

  @action setSignedIn(status, email,  account_id) {
    this.signedIn = status;
    if (status && email) {
      this.email = email;
      this.account_id = account_id;
    }
  }

  //For landing page
  signInWithoutResources(email = null, password = null) {
    const store = {
      authentication_token: localStorage.getItem("token"),
      email: localStorage.getItem("email"),
      account_id: localStorage.getItem("account_id")
    };
    if (store.email && store.authentication_token) {
      this.signInFromStorageWithoutResources(
        store.email,
        store.account_id
      );
    } else if (email && password) {
      this.createSession(email, password);
    }
  }

  @action async signInFromStorageWithoutResources(
    email,
    account_id
  ) {
    const response = await Api.get(this.sessions);
    const status = await response.status;

    if (status === 200) {
      this.email = email;
      this.account_id = account_id;
      this.signedIn = true;
      this.isLoading = false;
      history.push(`/welcome/accounts/${this.account_id}`);
    } else {
      this.signOut();
    }
  }
  //end for landing

  @action async signIn(email = null, password = null) {
    this.setIsLoading(true)
    const store = {
      authentication_token: localStorage.getItem("token"),
      email: localStorage.getItem("email"),
      account_id: localStorage.getItem("account_id")
    };

    if (store.email && store.authentication_token) {
      this.signInFromStorage(
        store.email,
        store.account_id
      );
      this.setIsLoading(false)
    } else if (email && password) {
      this.createSession(email, password);
      this.setIsSingningIn(true);
    } else {
      this.signOut();
    }
  }

  @action async signInFromStorage(
    email,
    account_id
  ) {
    const response = await Api.get(this.sessions);
    const status = await response.status;

    if (status === 200) {
      this.email = email;
      this.account_id = account_id;
      this.signedIn = true;

      this.setIsLoading(false)
    } else {
      this.signOut();
    }
  }

  async create(firstName, lastName, email, password, password_confirmation) {
    this.setIsLoading(true);
    const response = await Api.post(this.users, {
      user: {
        firstName,
        lastName,
        email,
        password,
        password_confirmation
      }
    });

    const status = await response.status;

    if (status === 200) {
      this.setIsLoading(false);
      history.push("/users/new-user-session");
    } else {
      console.log("error");
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

      if (user.accounts.length > 0) {
        localStorage.setItem("account_id", user.accounts[0].slug);
        this.setSignedIn(
          true,
          user.email,
          user.accounts[0].slug
        );
        history.push(`/welcome`);
        this.setIsLoading(false);
      } else {
        this.setSignedIn(
          true,
          user.email,
          localStorage.getItem("null")
        );
        this.setIsLoading(false);
      }
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
    localStorage.removeItem("account_id");
    this.email = null;
    this.account_id = null;
    this.coords = {};
    this.signedIn = false;
    this.isLoading = false;
    history.push("/users/new-user-session");
  }
}
export default new User();
