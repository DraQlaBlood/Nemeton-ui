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
  @observable firstName = null;
  @observable lastName = null;
  @observable user_id = null;
  @observable currentlatitude = null;
  @observable currentlongitude = null;
  @observable coords = null;

  @action setIsLoading(status) {
    this.isLoading = status;
  }

  @action setIsSingningIn(status) {
    this.isSingningIn = status;
  }

  @action setSignedIn(status, email, firstName, lastName, user_id) {
    this.signedIn = status;
    if (status && email) {
      this.email = email;
      this.firstName = firstName;
      this.lastName = lastName;
      this.user_id = user_id;
    }
  }

  //For landing page
  signInWithoutResources(email = null, password = null) {
    const store = {
      authentication_token: localStorage.getItem("token"),
      email: localStorage.getItem("email"),
      firstName: localStorage.getItem("firstName"),
      lastName: localStorage.getItem("lastName"),
      user_id: Number(localStorage.getItem("user_id"))
    };
    if (store.email && store.authentication_token) {
      this.signInFromStorageWithoutResources(
        store.email,
        store.firstName,
        store.lastName,
        store.user_id
      );
    } else if (email && password) {
      this.createSession(email, password);
    }
  }

  @action async signInFromStorageWithoutResources(
    email,
    firstName,
    lastName,
    user_id
  ) {
    const response = await Api.get(this.sessions);
    const status = await response.status;

    if (status === 200) {
      this.email = email;
      this.firstName = firstName;
      this.lastName = lastName;
      this.user_id = user_id;
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
      email: localStorage.getItem("email"),
      firstName: localStorage.getItem("firstName"),
      lastName: localStorage.getItem("lastName"),
      user_id: Number(localStorage.getItem("user_id"))
    };

    if (store.email && store.authentication_token) {
      this.signInFromStorage(
        store.email,
        store.firstName,
        store.lastName,
        store.user_id
      );
    } else if (email && password) {
      this.createSession(email, password);
      this.setIsSingningIn(true);
    } else {
      this.signOut();
    }
  }

  @action async signInFromStorage(email, firstName, lastName, user_id) {
    this.setIsLoading(true);
    const response = await Api.get(this.sessions);
    const status = await response.status;

    if (status === 200) {
      this.email = email;
      this.firstName = firstName;
      this.lastName = lastName;
      this.user_id = user_id;
      this.signedIn = true;
      this.isLoading = false;

      //history.push("/welcome");
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
    console.log("logging in");
    this.setIsLoading(true);
    const response = await Api.post(this.sessions, { email, password });

    const status = await response.status;

    if (status === 201) {
      const body = await response.json();
      const { user } = body.data;
      localStorage.setItem("token", user.authentication_token);
      localStorage.setItem("email", user.email);
      localStorage.setItem("firstName", user.firstName);
      localStorage.setItem("lastName", user.lastName);
      localStorage.setItem("user_id", user.id);

      this.setIsLoading(false);
      this.setSignedIn(
        true,
        user.email,
        user.firstName,
        user.lastName,
        user.id
      );

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
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("user_id");
    this.email = null;
    this.firstName = null;
    this.lastName = null;
    this.user_id = null;
    this.coords = {};
    this.signedIn = false;
    this.isLoading = false;
    history.push("/users/new-user-session");
  }

  /*Getting user coordinates*/
  @action async getCoords() {
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
      } else {
        this.currentlatitude = bodycurrent.latitude;
        this.currentlongitude = bodycurrent.longitude;

        let city = bodycurrent.city;
        let country = bodycurrent.country;
        this.coords = { city, country };

        this.setIsSingningIn(false);
      }
    }
  }
}
export default new User();
