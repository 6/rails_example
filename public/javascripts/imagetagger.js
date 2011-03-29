/* Based off code from:
 * http://www.nealgrosskopf.com/tech/thread.php?pid=62
 */

//Placed outside .ready for scoping
var targetX, targetY, ajaxCreatePath, ajaxDeletePath;
var tagCounter = 0;
var curTagContent = '';
 
$(document).ready(function(){
    //Dynamically wrap image
    $(".taggable").wrap('<div id="tag-wrapper"></div>');
    
    //Dynamically size wrapper div based on image dimensions
    $("#tag-wrapper").css({width: $("img").outerWidth(), height: $("img").outerHeight()});
    
    //Append #tag-target content and #tag-input content
    $("#tag-wrapper").append('<div id="tag-target"></div><div id="tag-input"><label for="tag-name">Enter tag content:</label><input type="text" id="tag-name"><button type="submit">Submit</button>&nbsp;<button type="reset">Cancel</button></div>');
    
    //$("#tag-wrapper").click(function(e){
    $(".taggable").click(function(e){     
        //Determine area within element that mouse was clicked
        mouseX = e.pageX - $("#tag-wrapper").offset().left;
        mouseY = e.pageY - $("#tag-wrapper").offset().top;
        
        //Get height and width of #tag-target
        targetWidth = $("#tag-target").outerWidth();
        targetHeight = $("#tag-target").outerHeight();
        
        //Determine position for #tag-target
        targetX = mouseX-targetWidth/2;
        targetY = mouseY-targetHeight/2;
        
        //Determine position for #tag-input
        inputX = mouseX+targetWidth/2;
        inputY = mouseY-targetHeight/2;
        
        //Animate if second click, else position and fade in for first click
        if($("#tag-target").css("display")=="block")
        {
            $("#tag-target").animate({left: targetX, top: targetY}, 500);
            $("#tag-input").animate({left: inputX, top: inputY}, 500);
        } else {
            $("#tag-target").css({left: targetX, top: targetY}).fadeIn();
            $("#tag-input").css({left: inputX, top: inputY}).fadeIn();
        }
        
        //Give input focus
        $("#tag-name").focus(); 
    });
    
    //If cancel button is clicked
    $('button[type="reset"]').click(function(){
        closeTagInput();
    });
    
    //If enter button is clicked within #tag-input
    $("#tag-name").keyup(function(e) {
        if(e.keyCode == 13) submitTag();
    }); 
    
    //If submit button is clicked
    $('button[type="submit"]').click(function(){
        submitTag();
    });
 
});
 
// submit a new tag (AJAX)
function submitTag()
{
    curTagContent = $("#tag-name").val();
    if(curTagContent.trim() == "") {
        alert('Please enter some text.');
        return !1;
    }
    $.post(ajaxCreatePath, {
        'tag[content]':curTagContent,
        'tag[image_id]':image_id,
        'tag[xpos]':targetX,
        'tag[ypos]':targetY
    }, function(tagId) {
        addTag(curTagContent, tagCounter, targetX, targetY, tagId);
    });
    closeTagInput();
}

// add tag to HTML
function addTag(content, htmlId, xpos, ypos, tagId) {
    console.log("CONTENT:"+content);
    //Adds a new list item below image. Also adds events inline since they are dynamically created after page load
    $("#tag-wrapper").after('<p id="hotspot-item-' + htmlId + '" onmouseover="showTag('+htmlId+')" onmouseout="hideTag(' + htmlId + ')">' + content + ' <span class="remove" onclick="removeTag('+htmlId+','+tagId+')">Remove</span></p>');
    
    //Adds a new hotspot to image
    $("#tag-wrapper").append('<div id="hotspot-' + htmlId + '" class="hotspot" style="left:' + xpos + 'px; top:' + ypos + 'px;"><span>' + content + '</span></div>');
    
    $(".removeWhenTagged").html("");
    tagCounter++;
}
 
function closeTagInput()
{
    $("#tag-target").fadeOut();
    $("#tag-input").fadeOut();
    $("#tag-name").val("");
}

// remove tag using AJAX
function removeTag(htmlId,tagId)
{
    $("#hotspot-item-"+htmlId).fadeOut();
    $("#hotspot-"+htmlId).fadeOut();
    
    // TODO: apparently 'DELETE' is not supported by all browsers?
    $.ajax(ajaxDeletePath+tagId, {type:'DELETE'});
}
 
function showTag(i)
{
    $("#hotspot-"+i).addClass("hotspothover");
}
 
function hideTag(i)
{
    $("#hotspot-"+i).removeClass("hotspothover");
}
