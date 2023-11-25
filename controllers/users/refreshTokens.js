const { ctrlWrapper } = require("../../helpers");
const db = require("../../db");
const { getToken } = require("../../utils");

const refreshTokens = async (req, res, next) => {
    const { id } = req.user;

    const {token: verificationToken, refreshToken} = await getToken(id);  

    const { rows: updUser } = await db.query(`
    UPDATE users
    SET token=$1, refresh_token=$2
    WHERE id=$3 
    RETURNING token, refresh_token`,
        [verificationToken, refreshToken, id]
    );

    const { token, refresh_token } = updUser[0];

    console.log(refresh_token);
    
    res.cookie('refreshToken',
        refresh_token, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: 'none'
    });

    res.status(200).json({token})
}

module.exports = {
    refreshTokens: ctrlWrapper(refreshTokens)
};