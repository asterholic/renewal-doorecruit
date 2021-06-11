// gnb 작동 관련 소스코드
$(function(){
    const mainmnu = $("header .mainmnu");
    const gnb = $("header .mainmnu>.gnb>li");
    const sub = $("header .mainmnu>.gnb>li .gnb-dep1");
    const subSec = $("header .mainmnu>.gnb>li .gnb-dep1 .gnb-dep2");
    const myPage = $("header .mainmnu>.gnb>li .gnb-dep1 .mypage");
    const toggle = $("header .mainmnu>.gnb>li .gnb-dep1 .toggle");
    const bg = $("header>.bg");
    const wrapper = $("header>.wrapper");

    let hoverChk = false; /* gnb 항목에 마우스 hover 여부 체크 */
    let unfoldChk = false; /* gnb 항목 내 My Page 세부메뉴 펼쳐짐 여부 체크 */

    gnb.on({
        "mouseenter":function(){
            let nowIdx = gnb.index(this);

            if(!hoverChk){
                hoverChk = true;
            
                bg.stop().slideDown();
                sub.stop().slideDown();
                wrapper.css({"border-bottom": "1px solid #dedede"});
            }

            gnb.eq(nowIdx).children("a").css({color:"#0050a2","font-weight":500});
        }
        ,
        "mouseleave":function(){
            gnb.children("a").removeAttr("style");
        }
    });

    mainmnu.on("mouseleave",function(){
        sub.stop().slideUp();
        bg.stop().slideUp(function(){
            wrapper.removeAttr("style");
        });
        hoverChk = false;
    });

    myPage.on("click",function(evt){
        evt.preventDefault();

        if(!unfoldChk){
            subSec.slideDown(200);
            toggle.addClass("rotated");
            unfoldChk = true;
        }else if(unfoldChk){
            subSec.slideUp(200);
            toggle.removeClass("rotated");
            unfoldChk = false;
        }
    }); 
});

// 채용공고 슬라이드 관련 소스코드
$(function(){
    const jobSlide = $("#slides>.jobs");
    const job = $("#slides>.jobs>li");
    const btnPrev = $("#slides>.prev");
    const btnNext = $("#slides>.next");
    const tab = $("#slides>.classify>li");
    const notFound = $("#slides>.notfound");
    const guide = $("#slides>.classify>li .guide");

    let classifyIdx = 0; // 분류 index번호(전체0 ~ 계약직3)
    let jobIdx = 0; // 채용공고 index
    let idxArr = []; // 분류별 해당 공고의 index 목록
    let arrIdx = 0; // 분류별 해당 공고 목록 idxArr의 index

    const jobTotal = job.length; // Total 채용공고 개수
    let joblength = job.length; // 분류별 채용공고 개수(가변)

    // 채용공고 슬라이드 이동 및 강조 표시
    const slideMove = function(){
        jobSlide.stop().animate({
            left:400-600*arrIdx
        },500,"easeInOutCubic");
        job.eq(jobIdx).addClass("on").siblings().removeClass("on");
    }

    // 이전, 다음 버튼 활성화 여부 설정
    const btnActive = function(){
        btnPrev.removeAttr("style");
        btnNext.removeAttr("style");

        if(arrIdx==0 && joblength>1){
            btnPrev.css({"background-image":"url(../images/doorec-slides-left_btn_nonactive.png)"});
        }else if(arrIdx==joblength-1){
            btnNext.css({"background-image":"url(../images/doorec-slides-right_btn_nonactive.png)"});
        }else if(arrIdx==0 && joblength<=1){
            btnPrev.css({"background-image":"url(../images/doorec-slides-left_btn_nonactive.png)"});
            btnNext.css({"background-image":"url(../images/doorec-slides-right_btn_nonactive.png)"});
        }
    }

    if(joblength==0){
        guide.text(joblength);
        notFound.fadeIn();
    }else{
        guide.text((arrIdx+1)+" / "+joblength);
        notFound.hide();
    }

    btnPrev.css({"background-image":"url(../images/doorec-slides-left_btn_nonactive.png)"});

    tab.on("click",function(evt){
        evt.preventDefault();

        let nowIdx = tab.index(this);

        if(nowIdx!=classifyIdx){
            tab.eq(nowIdx).addClass("on").siblings().removeClass("on");
            classifyIdx = nowIdx;
        }

        job.show(); // 채용공고 모두 show -> 이후 해당 공고 이외 모두 숨김 처리

        idxArr = []; // idxArr 초기화

        let count = 0; // 선택한 분류 해당 공고 count

        switch(classifyIdx){
            case 0 : 
                joblength = jobTotal;
                jobSlide.removeAttr("style");
                jobSlide.css({width:400*joblength + 200*(joblength-1)});

                arrIdx = 0;
                jobIdx = 0;

                break;
            case 1 : 
                for(i=0;i<jobTotal;i++){
                    if(!job.eq(i).hasClass("fresh")){
                        job.eq(i).hide();
                    }else{
                        count++;
                        idxArr.push(i);
                    }
                }

                joblength = count;
                jobSlide.removeAttr("style");
                jobSlide.css({width:400*joblength + 200*(joblength-1)});

                arrIdx = 0;
                jobIdx = idxArr[arrIdx];
                
                guide.text((arrIdx+1)+" / "+joblength);

                break;
            case 2 : 
                for(i=0;i<jobTotal;i++){
                    if(!job.eq(i).hasClass("experienced")){
                        job.eq(i).hide();
                    }else{
                        count++;
                        idxArr.push(i);
                    }
                }

                joblength = count;
                jobSlide.removeAttr("style");
                jobSlide.css({width:400*joblength + 200*(joblength-1)});

                arrIdx = 0;
                jobIdx = idxArr[arrIdx];
                
                break;
            case 3 : 
                for(i=0;i<jobTotal;i++){
                    if(!job.eq(i).hasClass("contract")){
                        job.eq(i).hide();
                    }else{
                        count++;
                        idxArr.push(i);
                    }
                }

                joblength = count;
                jobSlide.removeAttr("style");
                jobSlide.css({width:400*joblength + 200*(joblength-1)});

                arrIdx = 0;
                jobIdx = idxArr[arrIdx];
                
                break;
        }

        btnActive();
        slideMove();
        
        if(joblength==0){
            guide.text(joblength);
            notFound.fadeIn();
        }else{
            guide.text((arrIdx+1)+" / "+joblength);
            notFound.hide();
        }
    });

    btnPrev.on("click",function(evt){
        evt.preventDefault();

        if(arrIdx>0){
            arrIdx--;

            if(classifyIdx==0){
                jobIdx--;
            }else{
                jobIdx = idxArr[arrIdx];
            }
            
            slideMove();
        }

        btnActive();

        guide.text((arrIdx+1)+" / "+joblength);
    });

    btnNext.on("click",function(evt){
        evt.preventDefault();

        if(arrIdx<joblength-1){
            arrIdx++;

            if(classifyIdx==0){
                jobIdx++;
            }else{
                jobIdx = idxArr[arrIdx];
            }

            slideMove();
        }

        btnActive();

        guide.text((arrIdx+1)+" / "+joblength);
    });

    
});