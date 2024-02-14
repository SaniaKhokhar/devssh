import user_img from "../../Assest/userb.png";
var UserProfile = (function () {
  var email = "";
  var username = "";
  var image = user_img;

  var getEmail = function () {
    return email; // Or pull this from cookie/localStorage
  };

  var setEmail = function (n_email) {
    email = n_email;
    // Also set this in cookie/localStorage
  };

  var getUsername = function () {
    return username;
  };

  var setUsername = function (n_username) {
    username = n_username;
  };

  var getImage = function () {
    return image;
  };

  var setImage = function (n_image) {
    image = n_image;
  };

  var clearDetails = function () {
    email = "";
    username = "";
    image = "";
  };

  return {
    getEmail: getEmail,
    setEmail: setEmail,
    getUsername: getUsername,
    setUsername: setUsername,
    getImage: getImage,
    setImage: setImage,
    clearDetails: clearDetails,
  };
})();

export default UserProfile;
