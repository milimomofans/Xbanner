(function(){
    var Xbanner = function(id,width,height){
        //获取第一层
        this.slide = document.getElementById(id)
        //获取第二层
        this.room = this.slide.getElementsByTagName('div')
        //获取图片
        this.imgs = this.slide.getElementsByTagName('img')
        this.len = this.imgs.length
        
        this.width = width
        this.height = height
        this.index = 0


        this.createBtn()
        this.createSmallBtn()
        
        this.cssStyle()
        this.resetCss()

        this.time = setInterval(() => {
            if(this.index >= this.len -1){
                this.index = 0
            }else{
                this.index++
            }
            this.move()
        }, 3000);
    }
    
    //生成前进后退并设置点击事件
    Xbanner.prototype.createBtn=function(){
        var buttonTop = this.height/2-14
        var prev = document.createElement('div')
        prev.innerHTML = '<'
        prev.setAttribute('class','prev')
        prev.style.left = 0+'px'
        prev.style.top = buttonTop +'px'
        this.slide.appendChild(prev)

        //如果使用匿名函数，this的指向会发生丢失
        prev.onclick=()=>{
            
            if(this.index == 0){
                this.index = this.len-1
                this.move()
            }else{
                this.index--
                this.move()
            }
        }


        var next = document.createElement('div')
        next.innerHTML = '>'
        next.setAttribute('class','next')
        next.style.right = 0+'px'
        next.style.top = buttonTop +'px'
        this.slide.appendChild(next)


        next.onclick=()=>{
            
            if(this.index >= this.len-1){
                this.index = 0
                this.move()
            }else{
                this.index++
                this.move()
            }
        }
    }



    //生成导航小按钮
    Xbanner.prototype.createSmallBtn=function(){
        var nav = document.createElement('div')
        nav.setAttribute('class','bannerNav')
        this.slide.appendChild(nav)

        var list=document.createElement('ul')
        nav.appendChild(list)

        //遍历生成小导航栏
        for(let i=0;i<this.len;i++){
            var li = document.createElement('li')
            li.setAttribute('class','imgDots')
            list.appendChild(li)

            li.onclick = ()=>{
                this.index = i
                this.move()
            }
        }
        this.slide.getElementsByClassName('imgDots')[0].style.background='red'
        
    }



    //设置css样式
    Xbanner.prototype.cssStyle = function(){
        this.slide.style.width = this.width+'px'
        this.slide.style.height = this.height+'px'
        this.slide.style.overflow = 'hidden'
        this.slide.style.position = 'relative'

        this.room[0].style.width =(this.width*this.len)+'px'
        this.room[0].style.transition = 'all 1s'
        for(var i =0;i<this.len;i++){
            this.imgs[i].style.float = 'left'
            this.imgs[i].style.width = this.width+'px'
            this.imgs[i].style.height = this.height+'px'
        }
    }

    //初始化生成元素样式
    Xbanner.prototype.resetCss = function(){
        var createStyle = document.createElement('style')
        createStyle.innerHTML+= `.prev{position:absolute;font-size:30px}`
        createStyle.innerHTML+=`.next{position:absolute;font-size:30px}`
        createStyle.innerHTML+=`.bannerNav{position:absolute;bottom:0px;padding:20px}`
        createStyle.innerHTML+=`.bannerNav ul li{list-style:none;width: 20px;height: 20px;border: 1px solid black;float: left;border-radius: 50%;background-color:white;}`
        document.head.appendChild(createStyle)
    }
    //移动函数
    Xbanner.prototype.move = function(){
        var imgDots = this.slide.getElementsByClassName('imgDots')
        for(let i =0;i<imgDots.length;i++){
            imgDots[i].style.background = 'white'
        }

        imgDots[this.index].style.background ='red'
        this.room[0].style.marginLeft = -(this.index * this.width)+'px'
    }

    

    this.Xbanner = Xbanner;
    
})() 