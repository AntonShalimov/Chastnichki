var filterTitle = 'td#filter .filterTitle',
    filterClass = 'td#filter .filter';
$(filterTitle).eq(0).clone().html('Частнички').insertBefore(filterTitle+':eq(0)');
//$(filterTitle).eq(0).append("<div class='selected'>предложения от частных лиц</div>");
//$('<div class="filterTitle">Частнички</div>').insertBefore('td#filter .filterTitle');





function getPages()
{
	var pages = new Array(),
        anchors = $('div.pagebar a');

	for(i=0;i<anchors.length;i++)
	{
		pages.push(anchors[i].getAttribute('href'));
	}

	$('div.pager').remove();

	return pages;
}

function getOtherPagesContent(url)
{
	var xhr = new XMLHttpRequest();

	xhr.open("GET", "http://baza.farpost.ru"+url, true);
	xhr.onreadystatechange = function() {
	  if (xhr.readyState == 4) {
		  parsePage(xhr.responseText);
	  }
	}
	xhr.send();
}

function parsePage(content)
{
	$(content).find('.viewdirBulletinTable tr').each(function(i,e){
 	$e = $(e);

 	if($e.find(":contains('частное')").length>0)
 	{
//    		$e.addClass('boldbulletin');
		$e.appendTo('.viewdirBulletinTable');
 	}else{
 		$e.remove();
 	}
 });
}


var pagesUrl = getPages();

for(i=0;i<=pagesUrl.length;i++)
{
	getOtherPagesContent(pagesUrl[i]);
}

console.log(pagesUrl);


$('.viewdirBulletinTable tr').each(function(i,e){
	$e = $(e);

	if($e.find(":contains('частное')").length>0)
	{
		$e.addClass('boldbulletin');
	}else{
		$e.remove();
	}
});