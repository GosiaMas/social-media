const user = {
  username: "monique",
  from: "netherlands",
};

function returnUser() {
  return new Promise((res) => {
    setTimeout(() => {
      res(user);
    }, 1000);
  });
}

// returnUser().then((user) => {
//   console.log("user:", user);
// });
async function getPromise() {
  const aUser = await returnUser();
  console.log("aUser:", aUser);
  return 1;
}

getPromise();
