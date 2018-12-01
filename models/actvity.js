import Http from '../utils/http'

export default class myActivity extends Http {
    constructor(){
        super();
    }
    
    /**
     * 获取所以的活动信息
     * @param {}} data 
     * @param {*} callback 
     */
    getActvities(data,callback){
        let that = this
        let params ={
            url:`weixin/data/selecthuodong?inner_membergid=${data.userId}&inner_membername=
            ${data.nickName}&token=${data.token}&pagesize=10&curpage=1&orderBy=&cbkind=&cbregion=`,
            method:'POST',
            success:function(res){
                console.log(res)
                callback && callback(res)
            }
        }
        this.request(params)
    }

    /**
     * 获取活动详情
     * @param {*} data 
     * @param {*} callback 
     */
    getActvitiyDateil(data,callback){
        let that = this
        let params ={
            url:`/api/querydata/getactivitydetail?inner_membergid=${data.userId}&inner_membername=
            ${data.nickName}&token=${data.token}&keyid=${data.gid}`,
            method:'POST',
            success:function(res){
                console.log(res)
                callback && callback(res)
            }
        }
        //
        this.request(params)
    }

    /**
     * 获取列表信息
     * @param {} data 
     * @param {*} callback 
     */
    getUserjoin(data,callback){
        let that =  this 
        let params ={
            url:`api/querydata/getorganizers?inner_membergid=${data.userId}&inner_membername=
            ${data.nickName}&token=${data.token}&keyid=${data.gid}`,
            method:'POST',
            success:function(res){
                console.log(res)
                callback && callback(res)
            }
        }
        
        this.request(params)
    }
    
    /**
     * 
     * @param {} data 
     * @param {*} callback 
     */
    getActvitiyButtonState(data,callback){
        let that = this
        let params ={
            url:`weixin/data/inszactivitystaff?inner_membergid=${data.userId}&inner_membername=
            ${data.nickName}&token=${data.token}&activityid=${data.gid}`,
            method:'POST',
            success:function(res){
                console.log(res)
                callback && callback(res)
            }
        }
        this.request(params)
    }

    /**
     * 获取活动状态
     * @param {} data 
     * @param {*} callback 
     */
    getDzStatus(data,callback){
        let that = this
        let params ={
            url:`szsetting/szweixin/getdeterminewhether?inner_membergid=${data.userId}&inner_membername=
            ${data.nickName}&token=${data.token}&activityid=${data.gid}`,
            method:'POST',
            success:function(res){
                console.log(res)
                callback && callback(res)
            }
        }
        this.request(params)
    }

    /**
     *  点赞
     * @param {}} data 
     * @param {*} callback 
     */
    createDzStatus(data,callback){
        let that = this
        let params ={
            url:`szsetting/szweixin/getgivealike?inner_membergid=${data.userId}&inner_membername=
            ${data.nickName}&token=${data.token}&activityid=${data.gid}&activityname=${data.title}`,
            method:'POST',
            success:function(res){
                console.log(res)
                callback && callback(res)
            }
        }
        this.request(params)
    }

    

}