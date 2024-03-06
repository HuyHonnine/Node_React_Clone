import * as auhService from '../services/auth'

export const register = async(req, res)=> {
    const { name, phone, password } = req.body
    try {
        if(!name || !phone || !password) {
            return res.status(400).json({
                err: 1,
                msg: 'Invalid inputs!'
                });
        }
        else if (!/^\d+$/.test(phone)) {
            return res.status(400).json({
                err: 1,
                msg: 'Phone must be a number!',
            });
        } 
        else if (password.length <= 8) {
            return res.status(400).json({
                err: 1,
                msg: 'Password must be greater than 8 characters!',
            });
        }
        const respone = await auhService.registerService(req.body)
        return res.status(200).json(respone)

    } catch (error) {
        return res.status(500).json({
            err:-1,
            msg: 'Fail to register' + error
        })
    }

}

export const login = async (req, res) => {
    const { phone, password } = req.body
    try {
        if(!phone || !password){
            return res.status(400).json({
                err: 1,
                msg: 'Invalid inputs!'
            });
        }
        else if (!/^\d+$/.test(phone)){
            return res.status(400).json({
                err: 1,
                msg: 'Phone must be a number!'
            });
        }
        const response = await auhService.loginService(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err:-1,
            msg: 'Fail to login' + error
        })
    }
}

export const logout = async (req, res) => {
    try {
        const result = await auhService.logoutService(req);
        return res.status(result.status).json(result.response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed to logout' + error,
        });
    }
};

export const getUserController = async (req, res) => {
    try {
        const response = await auhService.getUserService()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at auth controller: ' + error,
        })
    }
}