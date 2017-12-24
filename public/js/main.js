// メニューの開閉
$(function() {
  var $toggleBtn = $('.toggle-menu');
  var $menu = $('.global-menu');
  var $closeBtn = $('.close-btn');
  var $menuItem = $menu.find('li');
  var className = 'js-active';

  $toggleBtn.on('click', open);
  $closeBtn.on('click', close);
  $menuItem.on('click', close);

  function open() {
    $menu.addClass(className);
  }

  function close() {
    $menu.removeClass(className);
  }
});


// スクロール
$(function() {
  $('a[href^="#"]').on('click', function() {
    var speed = 400;
    var href= $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top;
    $('body,html').animate({scrollTop:position}, speed, 'swing');
  });
});


// blog
// $(function() {
//   var $blogArea = $('#blog');
//   var $blog = $('#blog-list');

//   $.ajax({
//     //はてなrssファイルを読み込む
//     //ブログのアドレスの最後にrssをつける
    
//     //url: 'http://blocco.hatenablog.com/rss',
//     url: 'http://noriyasu-katano.hatenablog.com/rss',

//     success: function(data) {
//       //はてなrssの読み込み
//       // var rss_url = 'http://blocco.hatenablog.com/rss';
//       var rss_url = 'http://noriyasu-katano.hatenablog.com/rss';

//       var htmlstr = "";

//       //アイテムの調整
//       $.get(rss_url, function(data) {
//           var $item = $(data).find("item");
//           if (!$item.length) {
//             // 記事が取得できなければブログエリアを削除
//             $blogArea.remove();
//             return false;
//           }

//           $(data).find("item").each(function (i) {
//             var el = $(this);
//             var elimg = el.find("enclosure").attr("url");
//             var eltime = new Date(el.find("pubDate").text());

//             htmlstr += '<li class="list__item">';
//             htmlstr += '    <a href="' + el.find("link").text() + '" title="' + el.find("title").text() + '" target="_blank">';
//             htmlstr += '        <div class="list__item-img-bg"  style="background-image: url(' + elimg + ')"></div>';
//             htmlstr += '        <time class="list__item-time">' + eltime.getFullYear() + '/' + (eltime.getMonth() + 1) + '/' + eltime.getDate() + '</time>';
//             htmlstr += '        <p class="list__item-blogtitle">' + el.find("title").text() + '</p>';
//             htmlstr += '    </a>'
//             htmlstr += '</li>';

//             if(i === 3) { // 表示件数の設定
//               return false;
//             };
//           });

//         //footer前に挿入する
//         $blog.append(htmlstr);
//       });
//     },

//     error: function() {
//       // 通信失敗の場合はブログエリアを削除
//       $blogArea.remove();
//       return false;
//     }
//   });
// });


$(function() {
   var $blogArea = $('#blog');
   var $blog = $('#blog-list');

	$.ajax({
		url: 'rss.php',
		xmlType: 'xml',
		success: function(xml) {
			var row = 0;
			var data = [];
			var nodeName;
			var output = $('#rss');
      // start item 成形

      var $item = $(xml).find('item');
      if (!$item.length) {
        $blogArea.remove();
        return false;
      }

			$item.each(function() {
				data[row] = {};
				$(this).children().each(function() {
				    nodeName = $(this)[0].nodeName;
				    data[row][nodeName] = {};
				    attributes = $(this)[0].attributes;
				    for (var i in attributes) {
						data[row][nodeName][attributes[i].name] = attributes[i].value;
				    }
					data[row][nodeName]['text'] = $(this).text();
				});
        row++;
        if (row === 4) {
          return false;
        }
      });
      
      // end item 成形
      var htmlstr = '';
			for (i in data) {
        console.log(data[i]);
        var eltime = new Date(data[i].pubDate.text);

        htmlstr += '<li class="list__item">';
        htmlstr += '    <a href="' + data[i].link.text + '" target="_blank">';
        htmlstr += '        <div class="list__item-img-bg"  style="background-image: url(' + data[i].enclosure.url + ')"></div>';
        htmlstr += '        <time class="list__item-time">' + eltime.getFullYear() + '/' + (eltime.getMonth() + 1) + '/' + eltime.getDate() + '</time>';
        htmlstr += '        <p class="list__item-blogtitle">' + data[i].title.text + '</p>';
        htmlstr += '    </a>'
        htmlstr += '</li>';
      }
      $blog.append(htmlstr);
    },

    error: function() {
      // 通信失敗の場合はブログエリアを削除
      $blogArea.remove();
      return false;
    }
  });
});