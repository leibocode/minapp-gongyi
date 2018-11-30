import { config } from './config.js'
import { Token } from './utils/token.js'
App({
    onLaunch:function(){
        let token =new Token()
        token.verify()
    },
    onShow:function(){

    }
})