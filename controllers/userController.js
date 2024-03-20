exports.getAllUser = (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'data found !!'
    })
}

exports.addNewUser = (req, res) => {
    const {name, id} = req.body;
    if(!name && !id){
        res.status(404).json({
            status: 'failed',
            message: 'data not found !!'
        })
    }else{
        res.status(200).json({
            status: 'success',
            message: 'data add success !!'
        })
    }
   
}

exports.getUserById = (req, res) => {
    const {id} = req.params;
    const array = [1,2,3,4];
    if(!array[id]){
        res.status(404).json({
            status: 'failed',
            message: 'data not found !!'
        })
    }else{
        res.status(200).json({
            status: 'success',
            message: 'data id found !!'
        })
    }
   
}

exports.deleteUser = (req, res) => {
    const {id} = req.params;
    const array = [1,2,3,4];
    if(!array[id]){
        res.status(404).json({
            status: 'failed',
            message: 'data not found !!'
        })
    }else{
        res.status(200).json({
            status: 'success',
            message: 'data updated !!'
        })
    }
   
}

exports.updateUser = (req, res) => {
    const {id} = req.params;
    const array = [1,2,3,4];
    if(!array[id]){
        res.status(404).json({
            status: 'failed',
            message: 'data not found !!'
        })
    }else{
        res.status(200).json({
            status: 'success',
            message: 'data deleted !!'
        })
    }
   
}