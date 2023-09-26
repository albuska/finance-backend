const { catchAsync, signToken } = require('../../utils');

const { FRONT_DEV } = process.env;

exports.googleAuth = catchAsync(async (req, res) => {
    const { verificationToken } = req.params;

    console.log("Hello, world");

    console.log("verificationToken",verificationToken );
//   const { _id: id } = req.user;
//   const token = signToken(id);

//   await Users.findByIdAndUpdate(id, { token });

//   res.redirect(`${FRONT_DEV}?token=${token}`);
});