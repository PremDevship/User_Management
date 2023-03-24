const express = require('express')
// const multer = require('multer');
const userdetails = require('../models/user')
const uuid = require('uuid');
const router = express.Router();

// const storage = multer.diskStorage({
//     destination: (req, file, callback) => {
//         callback(null, "../userdashboard/public/uploads")  
//     },
//     filename: (req, file, callback) => {
//         callback(null, file.originalname);
//     }
    
// })

// const upload = multer({storage : storage})

router.get('/Getuser', async (req, res) => {
    try {

        let userData = await userdetails.find()
        res.status(200).json({ 'status': 200, 'data': userData, 'message': 'successfully fetched Data', 'error': false })
    }
    catch (error) {
        res.status(400).json({ 'status': 400, 'message': error.message, 'error': true })
    }
})

router.post('/Adduser', async (req, res) => {
    try {
        var reqdata = req.body;
        let finaldata = new userdetails({
            id: uuid.v4(),
            Userimage: reqdata.Userimage,
            Firstname: reqdata.firstname,
            Lastname: reqdata.lastname,
            Department: reqdata.department,
            Email: reqdata.email,
            Country: reqdata.country
        })

        let regdata = await finaldata.save()
        res.status(200).json({ 'status': 200, 'data': regdata, 'message': 'successfully posted', 'error': false })
    }
    catch (error) {
        res.status(400).json({ 'status': 400, 'message': error.message, 'error': true })
    }
})

router.put('/Edituser/:id', async (req, res) => {
    try {
        var reqdata = req.body;
        let checkUser = await userdetails.findOne({id: req.params.id});
        if(!checkUser){
          throw new Error('User not Exist..')
        }
        let saveData = await userdetails.findOneAndUpdate({id: req.params.id},reqdata,{new:true})
        console.log(saveData)
        res.status(200).json({ 'status': 200, 'data': saveData, 'message': 'successfully User Details updated', 'error': false })
    }
    catch (error) {
        res.status(400).json({ 'status': 400, 'message': error.message, 'error': true })
    }
})

router.delete('/Deleteuser/:id', async (req, res) => {
    try {
        let checkUser = await userdetails.findOne({id: req.params.id});
        if(!checkUser){
          throw new Error('User not Exist..')
        }
        let Deletedata = await userdetails.findOneAndDelete({id: req.params.id})
        console.log(Deletedata)
        res.status(200).json({ 'status': 200, 'data': Deletedata, 'message': 'Deleted successfully', 'error': false })
    }
    catch (error) {
        res.status(400).json({ 'status': 400, 'message': error.message, 'error': true })
    }
})

router.post('/pagination', async (req, res) => {
    try {
        var {page} = req.body;
        console.log(page);
        page = page ? page : 0;

        const Itemperpage = 5;

        var skip = Itemperpage * page;
        console.log(skip)

        var tempdata = {};

        var pageCheck = await userdetails.aggregate([
            {
                $match : tempdata,
            },
        ])
        var pageCount = pageCheck.length;
        console.log(pageCount);

        var pages = await userdetails.aggregate([
            {
                $match: tempdata,
            },
        ]).skip(skip).limit(Itemperpage)

        var nextPage = (skip + Itemperpage < pageCount) ? true : false

        var totalpage = Math.ceil(pageCount / Itemperpage);

        var finalpageData = {
            userpages : pages,
            currentPage : page,
            totalpage : totalpage,
            nextPage: nextPage
        }
        res.status(200).json({ 'status': 200, 'data': finalpageData, 'message': 'Pages fetched', 'error': false })
    }
    catch (error) {
        res.status(400).json({ 'status': 400, 'message': error.message, 'error': true })
    }
})

module.exports = router;