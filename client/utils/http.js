import { config } from '../config'

/**
 * http 请求类
 */
const tips ={
    1:'抱歉,出现一个错误',
    1000:'',
    3000:''
}
export default class Http{
    constructor(){
        this.baseRestUrl = config.url
    }
    
    request(params){
        let url = this.baseRestUrl + params.url
        if(!params.method){
            params.method ='Get'
        }
        wx.request({
            url:url,
            method:params.method,
            data:params.data,
            headers:{
                'content-type':'application/json'  
            },
            success:(res)=>{
                let code =res.statusCode.toString()
                if(code.startsWith('2')){
                    params.success && params.success(res.data)
                }else {
                    let error_code =res.data.error_data

                }
            },
            fail:(err)=>{
                this._show_error(1)
            }
        })
    }

    _show_error(error_code){
        if(!error_code){
            error_code = 1

        }
        const tip = tips[error_code]
        wx.showToast({
            title:tip?tip:tips[1],
            icon:'none',
            duration:2000
        })
    }
    _show_error_text(error_text){
        wx.showToast({
            title:error_text,
            icon:'none',
            duration:2000
        })
    }
}