import { observable, action } from "mobx";
import Api from "../../lib/helpers/api/index";
import history from "../../history";

class User {
  sessions = "/sessions";
  users = "/users";
  coordinates = "/coordinates";

  @observable isSingningIn = false;
  @observable isLoading = false;
  @observable signedIn = false;
  @observable email = null;
  @observable account_id = null;
  
  @observable currentlatitude = null;
  @observable currentlongitude = null;
  @observable coords = null;
  

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

      //console.log(this.account_id)

      history.push(`/welcome/accounts/${this.account_id}`);
    } else {
      this.signOut();
    }
  }
  //end for landing

  signIn(email = null, password = null) {
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
    this.setIsLoading(true);
    const response = await Api.get(this.sessions);
    const status = await response.status;

    if (status === 200) {
      this.email = email;
      this.account_id = account_id;
      this.signedIn = true;
      this.isLoading = false;
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
    //console.log("logging in");
    this.setIsLoading(true);
    const response = await Api.post(this.sessions, { email, password });

    const status = await response.status;

    if (status === 201) {
      const body = await response.json();
      const { user } = body.data;

      //console.log("accounts", user.accounts.length);
      localStorage.setItem("token", user.authentication_token);
      localStorage.setItem("email", user.email);

      if (user.accounts.length > 0) {
        localStorage.setItem("account_id", user.accounts[0].slug);
        this.setSignedIn(
          true,
          user.email,
          user.accounts[0].slug
        );

        this.setIsLoading(false);

        history.push(`/welcome`);
      } else {
        this.setSignedIn(
          true,
          user.email,
          localStorage.getItem("null")
        );
        this.setIsLoading(false);
        history.push(`/welcome`);
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

  /*Getting user coordinates*/
  @action async getCoords() {
    this.setIsLoading(true);
    const resp = await Api.get(this.coordinates);
    const stat = await resp.status;

    const response = await fetch("http://localhost:4001/location");
    const status = await response.status;

    if (stat === 200 && status === 200) {
      const body = await resp.json();
      let currentlocation = body.data.slice(-1).pop();
      const bodycurrent = await response.json();

      if (
        currentlocation == null ||
        (currentlocation.latitude !== bodycurrent.latitude &&
          currentlocation.longitude !== bodycurrent.longitude)
      ) {
        this.currentlatitude = bodycurrent.latitude;
        this.currentlongitude = bodycurrent.longitude;

        await Api.post(this.coordinates, bodycurrent);

        let city = bodycurrent.city;
        let country = bodycurrent.country;
        this.coords = { city, country };

        this.setIsSingningIn(false);
        this.setIsLoading(false);
      } else {
        this.currentlatitude = bodycurrent.latitude;
        this.currentlongitude = bodycurrent.longitude;

        let city = bodycurrent.city;
        let country = bodycurrent.country;
        this.coords = { city, country };

        this.setIsSingningIn(false);
        this.setIsLoading(false);
      }
    }
    
  }
}
export default new User();
