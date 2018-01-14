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


// ブログ
$(function() {
   var $blogArea = $('#blog');
   var $blog = $('#blog-list');
   var $blogBtn = $("#blog-btn");

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
        none();
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
      none();
      return false;
    }
  });

  function none() {
    $blogArea.remove();
      $blogBtn.remove();
      $('.global-menu-list__item').css('width', (100 / $('.global-menu-list__item').length) + "%");
      return false;
  }
});


// メール送信
$(function() {
  $('#contact-form').submit(function(event) {
    // HTMLでの送信をキャンセル
    event.preventDefault();
 
    // 操作対象のフォーム要素を取得
    var $form = $(this);
 
    // 送信ボタンを取得
    var $button = $form.find('button');
 
    // 送信
    $.ajax({
        url: $form.attr('action'),
        type: $form.attr('method'),
        data: $form.serialize(),
        timeout: 10000,  // 単位はミリ秒
 
        // 送信前
        beforeSend: function(xhr, settings) {
            // ボタンを無効化し、二重送信を防止
            $button.attr('disabled', true);
        },
        // 応答後
        complete: function(xhr, textStatus) {
            // ボタンを有効化し、再送信を許可
            $button.attr('disabled', false);
        },
 
        // 通信成功時の処理
        success: function(result, textStatus, xhr) {
            // 入力値を初期化
            $form[0].reset();
            result = JSON.parse(result);
            if (result[0] == 'error') {
              swal('送信に失敗しました。')
              return false;
            } else {
              swal('メールを送信いたしました。')
              return false;
            }

        },
 
        // 通信失敗時の処理
        error: function(xhr, textStatus, error) {
          $form[0].reset();
          swal('送信に失敗しました。')
        }
    });
  });
});


// トップボタン
$(function() {
  var $topBtn = $('.top-btn');
  var $window = $(window);
  var className = 'js-active';

  $window.on('scroll', function() {
    if ($window.scrollTop() > 100) {
      $topBtn.addClass(className);
    } else {
      $topBtn.removeClass(className);
    }
  });
});


// スライダー
$(function() {
  $(".header").bgswitcher({
    images: [
      "./images/slider/slide_01.png",
      "./images/slider/slide_02.jpg",
      "./images/slider/slide_03.jpg",
      "./images/slider/slide_04.jpg",
      "./images/slider/slide_05.jpg",
      "./images/slider/slide_06.jpg",
      "./images/slider/slide_07.jpg",
      "./images/slider/slide_08.jpg",
      "./images/slider/slide_09.jpg",
    ],
  });
});