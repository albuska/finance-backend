const { catchAsync, getToken } = require('../../utils');

const { FRONT_DEV } = process.env;

exports.googleAuth = catchAsync(async (req, res) => {
    console.log("req", req);
//   const { _id: id } = req.user;
//   const token = getToken(id);

//   await Users.findByIdAndUpdate(id, { token });

//   res.redirect(`${FRONT_DEV}?token=${token}`);
});