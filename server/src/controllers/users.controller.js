const { User } = require("../database/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const hashPassword = async (password, saltRound) => {
    const salt = await bcrypt.genSalt(saltRound);
    return await bcrypt.hash(password, salt);
};

const getUser = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({
            where: { email: email },
            attributes: { exclude: ["password"] },
        });
        res.status(200).json({ user: user })
    } catch (error) {
        res.status(400).json(({ message: error.message }))
    }
}

const createUser = async (req, res) => {
    try {
        const { name, lastName, email, password } = req.body;
        const hashedPassword = await hashPassword(password, 10);
        const [user, created] = await User.findOrCreate({
            where: email ? { email: email } : { userName: userName },
            defaults: {
                name: name,
                lastName: lastName,
                email: email,
                password: hashedPassword,
            }
        })

        if (!created) {
            let msg = email ? `E-mail ${email}` : `Username ${userName}`
            throw new Error(`${msg} already exists in database`)
        }

        await delete user.dataValues.password;

        res.status(200).json({ success: `User added with e-mail ${req.body.email}`, user: user.dataValues })

    } catch (error) {
        res.status(400).json(({ message: error.message }))
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            where: { email },
        });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({
                message: "User or password is not correct",
            });
        }

        await delete user.dataValues.password;

        const secret = process.env.SECRET;

        const token = jwt.sign({ user: user.dataValues }, secret, { expiresIn: "2h" });

        return res.status(200).json({
            message: "User access successfully",
            token
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const { name, lastName, email, documentId, phoneNumber, birthdate } = req.body;

        const dataToUpdate = {
            name,
            lastName,
            documentId,
            phoneNumber,
            birthdate
        }

        const userExists = await User.findOne({
            where: { email },
        });

        if (userExists === null) {
            throw new Error(`E-mail ${req.body.email} not found in database`)
        }

        const userUpdated = await User.update(dataToUpdate, {
            where: { email },
        });

        if (!userUpdated) {
            throw new Error(`E-mail ${req.body.email} not found in database`)
        }

        res.status(200).json({ success: `User ${req.body.email} updated succesfull `, params: dataToUpdate })

    } catch (error) {
        res.status(400).json(({ message: error.message }))
    }
}

// Exports
module.exports = {
    getUser,
    createUser,
    login,
    updateUser
}