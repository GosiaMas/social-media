const bcrypt = require("bcryptjs");

console.log(bcrypt.genSaltSync(18));
// Signinpmng up a user
const saltCreated = bcrypt.genSaltSync(18);
const myHashedPassword = bcrypt.hashSync("password", saltCreated);

// Login
console.log(bcrypt.compareSync("password", myHashedPassword));
//const saltCreatedIn2Seconds = bcrypt.genSaltSync(10);
// console.log(bcrypt.hashSync("password", saltCreated));
// console.log(bcrypt.hashSync("password", saltCreatedIn2Seconds));
// console.log(bcrypt.hashSync("password", saltCreated));

// $2a$10$63vQI3lzCNZvRaGo.Ooa1u
// $2a$10$PNhcuNCDLGSx.7KKhzdql.

// $2a$10$Ol0aOxT.YhM6F/p/tO9sqOclFbAaTCZ7JG6SqQx2q/7JHtXwdrfaK
// $2a$10$rqXgBwtGZvqHsHHZXPuK3uT.aGpwYq564UfyjyeLITZ89JaWPfBAy
// bcrypt.genSalt()
// bcrypt.genSaltSync()

// bcrypt.hash()
// bcrypt.hashSync()

// bcrypt.compare()
// bcrypt.compareSync()
