const userStore = {
  /** @type {Array<{name:string, email:string, password:string}>} */
  users: [
    { name: "Demo User", email: "demo@bean.com", password: "demo123" },
  ],


  add(user) {
    this.users.push(user);
  },

  find(email) {
    return this.users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
  },

  authenticate(email, password) {
    const user = this.find(email);
    return user && user.password === password ? user : null;
  },
};

export default userStore;
