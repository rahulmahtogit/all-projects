const mongoose = require('mongoose');
const User = require('../models/user');
const router = require('../routes/user');
const bcrypt = require('bcrypt')
const nodemailMailgun = require('nodemailer-mailgun-transport');
const nodemailer = require('nodemailer');



// Authenciation for Mailgun
const authMailgun = {
    auth:{
        api_key : '0e4e8569c7b1327fc54cb8986be8598e-2fbe671d-6ee49b9d',
        domain: 'sandbox35aa98d94a7c465bb38f19c48735c2aa.mailgun.org'
    }
}
let transporter = nodemailer.createTransport(nodemailMailgun(authMailgun));

exports.signup = async (req, res) => {
    const check_user = await User.findOne({ email: req.body.email })
    if (check_user) {
        return res.status(400).send("You have already one account with this email ID")
    }
    const user = new User(req.body)
    const baseUrl = req.protocol + "://" + req.get("host");

    let verificationEmailToUser = {
        from: 'rahul21051995@gmail.com', // Sender Email
        to: req.body.email, //  email receiver
        subject: 'Email Verification for MitraIndia',
        text: `Please click on this link to verify your email address for Login  ${baseUrl}/emailverification/${user._id}`
    };

    transporter.sendMail(verificationEmailToUser, async (error, data) => {
        if (error) {
            return res.status(401).send({ error: "Your Email ID is not correct" })
        }
        await user.save()
        res.status(200).send({ userid: user._id, message: "Email sent for Verification" })
    })
    

}


exports.emailver = async (req, res) => {
    const user = await User.findById(req.params.id)
    user.emailStatus = true
    await user.save().then(() => { res.status(201).send("Email Verified Succesfully") }).catch(() => {
        res.status(400).send({ userid: user._id, message: "Email doesnot Verified" })
    });
}

exports.emailExists = async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return res.status(404).send("You didn\'t have any account with this email ID")
    }
    res.status(200).send()
}

exports.forgotPassword = async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return res.status(404).send("You didn\'t have any account with this email ID")
    }
    user.password = req.body.password
    await user.save().then(() => { res.status(200).send("Your Password updated successfully") }).catch(() => {
        res.status(400).send("Your password has not been updated")
    })


}

exports.signin = async (req, res) => {

    const user = await User.findOne({ email: req.body.email})

    if (!user) {
        return res.status(400).send({ message: "You don\'t have any account with this email" })
    }

    const checkPassword = await bcrypt.compare(req.body.password, user.password)
    if (!checkPassword) {
        return res.status(400).send({ message: 'Password did not match' })
    }
    const token = await user.generateAuthToken()
    res.status(200).send({ user, token })

}


exports.signout = async (req, res) => {
    try {
        const user = req.user
        user.tokens = user.tokens.filter(tok => tok.token !== req.token)
        await user.save().then(() => { res.send("Logout Succesfully") })
    } catch (error) {
        res.status(400).send()
    }
}

