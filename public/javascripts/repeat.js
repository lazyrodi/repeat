/**
 * Repeat! 1.0
 * lazyrodi@gmail.com
 */

function onKeyDown(event) {
    if (event.key == '?') {
        $('.ui.basic.modal').modal('show');
    }

    /* TODO: Fix this temporary exception code for properly. */
    if ($("#subject_segment").text() == "") {
        return;
    }
    
    if (event.key == 'n' || event.key == 'N' || event.keyCode == 39) {
        onClickNextBtn();        
    }

    if (event.key == 'p' || event.key == 'P' || event.keyCode == 37) {
        onClickPrevBtn();
    }
    
    if (event.key == 'f' || event.key == 'F') {
        onClickFull();
    }

    if (event.key == 'i' || event.key == 'I') {
        onClickImportant();
    }
}

function onClickPrevBtn() {
    if ($mCurrentPageNumber == 0) {
        return;
    }
    $mCurrentPageNumber--;
    refreshPage($mCurrentPageNumber);
}

function onClickNextBtn() {
    if ($mCurrentPageNumber == $dataArr.length - 1) {
        return;
    }
    $mCurrentPageNumber++;
    refreshPage($mCurrentPageNumber);
}

function onClickPagenation() {
    $mCurrentPageNumber = parseInt($(this).text()) - 1;
    refreshPage($mCurrentPageNumber);
}

function onClickFull() {
    $("#btn_full").addClass("active");
    $("#btn_full").addClass("green");
    $("#btn_important").removeClass("active");
    $("#btn_important").removeClass("green");

    $mCurrentPageNumber = 0;
    $dataArr = $dataFullArr;
    refreshPage($mCurrentPageNumber);
}

function onClickImportant() {
    $("#btn_full").removeClass("active");
    $("#btn_full").removeClass("green");
    $("#btn_important").addClass("active");
    $("#btn_important").addClass("green");
    
    $mCurrentPageNumber = 0;
    $dataArr = $dataImportantArr;
    refreshPage($mCurrentPageNumber);
}

function setImportantArr() {
    var j = 0;
    
    for (var i = 0; i < $dataFullArr.length; i++) {
        if ($dataFullArr[i].important != undefined && $dataFullArr[i].important == "1") {
            $dataImportantArr[j++] = $dataFullArr[i];
        }
    }
}

function loadPage($title) {
    if ($title != undefined) {
        $('#data_subject').text($title);
    }
    
    setImportantArr();
    $("#doc_version").text($docVer);
    onClickFull();
}

function refreshPage($currentPageNumber) {
    var
        $data_title         = $('#data_title'),
        $td_data_category_1 = $('#data_category_1'),
        $td_data_category_2 = $('#data_category_2'),
        $td_data_category_3 = $('#data_category_3'),
        $important_label    = $("<span class='ui blue ribbon label'><i class='warning icon'> Important</i></span>");
    
    $currentData = $dataArr[$mCurrentPageNumber];
    $data_title.text($currentData.title);
    $td_data_category_1.text($currentData.data_category_1);
    $td_data_category_2.text($currentData.data_category_2);
    $td_data_category_3.text($currentData.data_category_3);
    
    if ($currentData.important != undefined && $currentData.important == "1") {
        $data_title.prepend($important_label);
    }
    
    refreshPagenation($currentPageNumber);
}
    
function refreshPagenation($currentPageNumber) {
    var
        $pagenation = $('#data_pagenation'),
        $dataLength = $dataArr.length,
        $btnPrev = $("<a id='btnPrev' class='icon item'><i class='left chevron icon'></i></a>"),
        $btnNext = $("<a id='btnNext' class='icon item'><i class='right chevron icon'></i></a>");
    
    $btnPrev.click(onClickPrevBtn);
    $btnNext.click(onClickNextBtn);
    
    $pagenation.empty();
    $pagenation.append($btnPrev);
    
    if ($dataLength < 11) {
        /* under 10 pages */
        for (var i = 0; i < $dataLength; i++) {
            var $item = $("<a class='item' style='width:1em;'></a>").text(i + 1);

            if (i == $currentPageNumber) {
                $item.addClass('active');
            }
            
            $item.click(onClickPagenation);
            $pagenation.append($item);
        }
    } else if ($currentPageNumber < 5) {
        /* < 1 2 3 4 5 6 7 8 ... > */
        for (var i = 0; i < 8; i++) {
            var $item = $("<a class='item' style='width:1em;'></a>").text(i + 1);
            if (i == $currentPageNumber) {
                $item.addClass('active');
            }
            
            $item.click(onClickPagenation);
            $pagenation.append($item);
        }
        
        $pagenation.append($("<span class='item' style='width:1em;'><i class='ellipsis horizontal icon'></i></span>"));

        $item = $("<a class='item' style='width:1em;'></a>").text($dataLength);
        $item.click(onClickPagenation);
        $pagenation.append($item);
        
    } else if (($dataLength - $currentPageNumber) < 7) {
        /* < 1 ... 14 15 16 17 18 19 20 > */
        var $item = $("<a class='item' style='width:1em;'></a>").text(1);
        $item.click(onClickPagenation);
        $pagenation.append($item);
        
        $pagenation.append($("<span class='item' style='width:1em;'><i class='ellipsis horizontal icon'></i></span>"));

        for (var i = $dataLength - 8; i < $dataLength; i++) {
            $item = $("<a class='item' style='width:1em;'></a>").text(i + 1);
            if (i == $currentPageNumber) {
                $item.addClass('active');
            }
            
            $item.click(onClickPagenation);
            $pagenation.append($item);
        }
    } else {
        /* < 1 ... 8 9 10 11 12 ... last > */
        var $item = $("<a class='item' style='width:1em;'></a>").text(1);
        $item.click(onClickPagenation);
        $pagenation.append($item);
        
        $pagenation.append($("<span class='item' style='width:1em;'><i class='ellipsis horizontal icon'></i></span>"));
        
        for (var i = $currentPageNumber - 2; i < $currentPageNumber + 4; i++) {
            $item = $("<a class='item' style='width:1em;'></a>").text(i + 1);
            if (i == $currentPageNumber) {
                $item.addClass('active');
            }
            
            $item.click(onClickPagenation);
            $pagenation.append($item);
        }
        
        $pagenation.append($("<span class='item' style='width:1em;'><i class='ellipsis horizontal icon'></i></span>"));
        
        $item = $("<a class='item' style='width:1em;'></a>").text($dataLength);
        $item.click(onClickPagenation);
        $pagenation.append($item);
    }
    
    $pagenation.append($btnNext);
}