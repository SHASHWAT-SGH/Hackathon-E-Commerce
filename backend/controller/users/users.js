const { User } = require('../../model/user');


// // get the User data
const getUserInfo = async (req, res) => {
    await User.findById(req.session.passport.user.id).then((data) => {
        res.status(200).json({ data: data });
    }).catch((err) => { res.status(200).send("some error occurred while fetching the data") })
}


// change user name
const changeUserName = async (req, res) => {
    await User.findByIdAndUpdate(req.session.passport.user.id, { name: req.body.name }).then((data) => {
        res.status(200).json({ data: data });
    }).catch((err) => { res.status(200).send("some error occurred while fetching the data") })
}


const changeMetamaskId = async (req, res) => {
    await User.findByIdAndUpdate(req.session.passport.user.id, { metaMaskId: req.body.id }).then(async (user) => {
        if(user.metaMaskId){
            res.status(200).json({ result:"Id updated successfully",data: user });
        }else{
            const updatedUser = await User.findById(req.session.passport.user.id);
            updatedUser.metaMaskId = req.body.id;
            await updatedUser.save();

            res.status(200).json({ result: "New Id added successfully", data: updatedUser });
        }
    }).catch((err) => { res.status(200).send("some error occurred while fetching the data") })
}


// change user name
const addUserPhone = async (req, res) => {
    await User.findByIdAndUpdate(req.session.passport.user.id, { phoneNo: req.body.phonenumber }).then((data) => {
        res.status(200).json({message:"phone number updated successfully",data:data});
    }).catch((err) => { res.status(401).send("Unauthorized") })
}


// // Signout the User (destroying session)
const signOutUser = (req, res) => {
    try {
        req.session.destroy(function (err) {
            res.status(200).send({ message: 'User signout successfully' });
        });
    } catch (err) {
        res.status(400).send({ message: 'Failed to sign out user' });
    }
}



module.exports = { getUserInfo, changeUserName,signOutUser,addUserPhone,changeMetamaskId }