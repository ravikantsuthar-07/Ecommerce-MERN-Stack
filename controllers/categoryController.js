import categoryModel from "../models/categoryModel.js";
import slugify from 'slugify'

export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(401).send({
                success: false,
                message: 'Name is Required'
            });
        }

        const existingCategory = await categoryModel.findOne({ name })
        if (existingCategory) {
            return res.status(200).send({
                success: false,
                message: 'Category Already Exisits'
            });
        }
        const category = await new categoryModel({ name, slug: slugify(name) }).save()
        return res.status(201).send({
            success: true,
            message: 'New Category Created',
            category
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Category',
            error
        });
    }
};

export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params
        const category = await categoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true });
        return res.status(200).send({
            success: true,
            message: 'Category Updated Successfully',
            category
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error while updating category',
            error
        });
    }
};

// Get All Category

export const CategoryController = async (req, res) => {
    try {
        const category = await categoryModel.find({});
        return res.status(200).send({
            success: true,
            message: 'All Category List',
            category
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error in Get Categroy List',
            error
        });
    }
};


export const singleCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug })
        return res.status(200).send({
            success: true,
            message: 'Get Single Category Successfully',
            category
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error while getting single category',
            error
        });
    }
};


export const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await categoryModel.findByIdAndDelete( id )
        return res.status(200).send({
            success: true,
            message: 'Category is Delete Successfully',
            category 
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error in Deleting Category',
            error
        });
    }
};