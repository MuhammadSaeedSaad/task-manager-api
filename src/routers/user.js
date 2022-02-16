const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require("multer");
const sharp = require("sharp");
const { sendWelcomEmail, sendGoodbyeEmail } = require("../emails/account")
const router = new express.Router()

router.post('/users', async (req, res) => {
    console.log(req.body);
    const user = new User(req.body)

    try {
        await user.save()
        sendWelcomEmail(user.email, user.name);
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        // console.log(e);
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        if (!user) {
            res.send("email or passowrd is incorrect!")
        }
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(401).send({ error: "incorrect email or password!" })
        // if send()'s argument is a string it will not work as we used app.use(express.json())
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        sendGoodbyeEmail(req.user.email, req.user.name);
        console.log(req.user.email + req.user.name);
        res.send(req.user)
    } catch (e) {
        console.log(e);
        res.status(500).send()
    }
})


const upload = multer({
    limists: {
        fileSize: 10 // this num in bytes
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){     // careful: no camelcase for originalname
            return cb(new Error("please uplaod an image"));
        } else if (file.size >= 100) {
            return cb(new Error("file size must not exceed 1 MB"));
        }

        cb(undefined, true);
    }
});

router.post("/users/me/avatar", auth, upload.single("avatar"), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250}).png().toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
});

router.get("/users/:id/avatar", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        
        if(!user || !user.avatar){
            throw new Error();
        }

        res.set("Content-Type", "image/png");
        res.send(user.avatar);
    } catch (error) {
        res.status(404).send();
    }
    

})

router.delete("/users/me/avatar", auth, async (req, res) => {
    try {
        req.user.avatar = undefined;
        await req.user.save();
        res.send()
    } catch (error) {
        res.status(404).send();
    }
})

module.exports = router