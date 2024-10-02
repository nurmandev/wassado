const UserModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");





// @Request  GET
// @Route    /api/useraccount/
// @access   private
const getUserAccount = async (req, res) => {
    const userDetail = await UserModel.find();
    res.status(200).json(userDetail)
}



// @Request  GET by ID
// @Route    /api/useraccount/:id
// @access   private
const getUserAccountById = async (req, res) => {
    const { id } = req.params;

    try {
        const userDetail = await UserModel.findById(id);
        if (!userDetail) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(userDetail);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};


//Email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Only letters and spaces
const nameRegex = /^[A-Za-z\s]+$/;
// Minimum 8 characters, at least one uppercase, one lowercase, one number, and one special character
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;






//---------------------------User Registration API START ------------------

// @Request  POST
// @Route    /api/useraccount/
// @access   private


const createUserAccount = async (req, res) => {

    const {

        userName,
        userPassword,
        firstName,
        lastName,
        userEmail,
        phoneNumber,
        status,
        userRole
        
    } = req.body;


    //testing credentials is according to requirment
    const emailCheck = emailRegex.test(userEmail);
    const nameCheck = nameRegex.test(userName);
    const passwordCheck = passwordRegex.test(userPassword);




    if (emailCheck == true) {
        if (passwordCheck == true) {
            if (nameCheck == true) {

                //password hashing
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(userPassword, salt);


                //checking email is already rgistered
                var Email_availability_db = await UserModel.findOne({
                    "userEmail": userEmail
                });

                if (Email_availability_db) {
                    return res.status(400).json({ error: "Email is already taken" })
                }

                const newUser = await UserModel.create({
                    userName: userName,
                    userEmail: userEmail,
                    userPassword: hashedPassword,
                    firstName: firstName,
                    lastName: lastName,
                    phoneNumber: phoneNumber,
                    userRole: userRole,
                    status: status,
                    //by default Role is guest after registeration admin can update the user Role 
                    //set default role is guest in UserModel
                })


                return res.status(200).json({ success: "account register successfully" })

            } else {
                res.status(400).json({ error: "name error" })
            }
        } else {
            res.status(400).json({ error: "password error" })
        }
    } else {
        res.status(400).json({ error: "email error" })
    }
}


//---------------------------User Registration API End ------------------

//---------------------------User Registration Update API Start ------------------
// @Request  PUT
// @Route    /api/useraccount/id
// @access   private


const updateUserAccount = async (req, res) => {

    const id = req.params.id;

    const {
        userName,
        userPassword,
        userRole,
        firstName,
        lastName,
        userEmail,
        phoneNumber,
        status,
    } = req.body;

    if (!userName) {
        return res.status(400).json({ error: 'user name is required' });
    }

    if (!userEmail) {
        return res.status(400).json({ error: 'user email is required' });
    }

    if (!userPassword) {
        return res.status(400).json({ error: 'user password is required' });
    }

    // Update Data Object
    const updateData = {
        userName: userName,
        userEmail: userEmail,
        userPassword: userPassword,
        userRole: userRole,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
    
        status: status
    }

    // Find todo By Id and Update
    const AvailableUser = await UserModel.findByIdAndUpdate(id, updateData, { new: true });

    console.log(AvailableUser)

    res.status(200).json({ success: 'Account Updated Successfull' })


}

//---------------------------User Registration Update API End ------------------


//---------------------------User Registration Delete API Start ------------------
// @Request  DELETE
// @Route    /api/useraccount/id
// @access   private



const deleteUserAccount = async(req,res)=>{

    const id = req.params.id;

    const DeleteUser = await UserModel.findByIdAndDelete(id) 

    if(!DeleteUser){
        res.status(400).json({error:`account not deleted`})

    }

    res.status(200).json({success:'account deleted successfully'})
}


//---------------------------User Registration Delete API End ------------------











module.exports = {
    getUserAccount,
    getUserAccountById,
    createUserAccount,
    updateUserAccount,
    deleteUserAccount
};

















