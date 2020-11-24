const Category = require('../models/category')
const slugify = require('slugify')
const mongoose = require('mongoose')
const express = require('express')

function f(cat,parentId = null){
    const categoryList = [];
    temp_cat = null ;

    if(parentId == null){
      temp_cat = cat.filter(categ =>categ.parentId == undefined)
    }else{
        temp_cat = cat.filter(categ=>categ.parentId == parentId)
    }
    for(let data of temp_cat){
        categoryList.push({
            _id:data._id,
            name:data.name,
            slug:data.slug,
            childern: f(cat,data._id)
        })
    }
    return categoryList
}

exports.addCategory = async (req,res)=>{
 
    const categoryObj = 
    {
        name: req.body.name,
        slug: slugify(req.body.name)
    }
    if(req.file){
        categoryObj.categoryImage = process.env.API + '/public/'+ req.file.filename
    }
    
    if(req.body.parentId){
        categoryObj.parentId = req.body.parentId

    }

    const cat = new Category(categoryObj)
    
    await cat.save((error,data)=>{
        if(error) return res.status(400).send({error})
        else if(data) return res.send({data})
    })
   }

exports.getCategories = async (req,res)=>{
    const cat = await Category.find({})
    if(!cat){
        return res.status(400).send()
    }
    const categoryList = f(cat)
    res.send(categoryList) 
   

}

